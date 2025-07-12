from flask import Flask, request, jsonify
import pandas as pd
import re
import requests
from nltk.tokenize import word_tokenize
from nltk.stem import WordNetLemmatizer
from nltk import pos_tag
from nltk.corpus import stopwords
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
from sklearn.decomposition import TruncatedSVD
import nltk

# Download NLTK resource jika belum ada
nltk.download('punkt')
nltk.download('stopwords')
nltk.download('wordnet')
nltk.download('averaged_perceptron_tagger')

app = Flask(__name__)

# Ambil data dari backend Node.js
try:
    response = requests.get("http://localhost:5003/api/job-data")
    if response.status_code != 200:
        raise Exception("Gagal mengambil data dari backend API")

    data_json = response.json()
    df = pd.DataFrame(data_json)
    df.fillna('', inplace=True)
except Exception as e:
    raise Exception("Gagal mengambil data dari backend API") from e

stop_words = set(stopwords.words('english'))
lemmatizer = WordNetLemmatizer()

def get_wordnet_pos(treebank_tag):
    if treebank_tag.startswith('J'):
        return 'a'
    elif treebank_tag.startswith('V'):
        return 'v'
    elif treebank_tag.startswith('N'):
        return 'n'
    elif treebank_tag.startswith('R'):
        return 'r'
    else:
        return 'n'

def clean_text(text):
    if isinstance(text, str):
        text = text.lower()
        text = re.sub(r'https?://\S+|www\.\S+', '', text)
        text = re.sub(r'<.*?>', '', text)
        text = re.sub(r'[^a-z\s]', '', text)
        tokens = word_tokenize(text)
        tokens = [t for t in tokens if t not in stop_words]
        tagged_tokens = pos_tag(tokens)
        lemmatized = [lemmatizer.lemmatize(word, get_wordnet_pos(tag)) for word, tag in tagged_tokens]
        return ' '.join(lemmatized)
    return ''

# Preprocessing
df['job_desc_clean'] = df['job_desc'].apply(clean_text)
df['job_qualifications_clean'] = df['job_qualifications'].apply(clean_text)
df['job_skills_clean'] = df['job_skills'].apply(clean_text)
df['job_skills_1_clean'] = df['job_skills_1'].apply(clean_text)

df['weighted_combined_text'] = (
    df['job_desc_clean'] + ' ' +
    df['job_qualifications_clean'] + ' ' +
    (df['job_skills_clean'] + ' ') * 2 +
    (df['job_skills_1_clean'] + ' ') * 2
)

vectorizer = TfidfVectorizer(ngram_range=(1,2))
tfidf_matrix = vectorizer.fit_transform(df['weighted_combined_text'])

lsa = TruncatedSVD(n_components=50, random_state=42)
lsa_matrix = lsa.fit_transform(tfidf_matrix)

@app.route('/')
def index():
    return "Python microservice running. Gunakan POST ke /recommend untuk mendapatkan rekomendasi."

@app.route('/recommend', methods=['POST'])
def recommend():
    data = request.get_json()
    user_input = data.get('description', '')

    if not user_input:
        return jsonify({'results': [], 'job_types': [], 'message': 'Mohon masukkan deskripsi kerja.'}), 400

    user_input_clean = clean_text(user_input)
    user_input_weighted = user_input_clean + ' ' + (user_input_clean + ' ') * 2

    user_tfidf = vectorizer.transform([user_input_weighted])
    user_lsa = lsa.transform(user_tfidf)

    similarities = cosine_similarity(user_lsa, lsa_matrix)[0]

    threshold = 0.5
    filtered_indices = [i for i, score in enumerate(similarities) if score > threshold]

    if not filtered_indices:
        return jsonify({'results': [], 'job_types': [], 'message': 'Tidak ada hasil dengan skor di atas 0.5.'})

    filtered_df = df.iloc[filtered_indices].copy()
    filtered_df['score'] = [similarities[i] for i in filtered_df.index]

    filtered_df = filtered_df[[
        'job_title', 'company_name', 'company_location', 'company_email', 'job_type', 'score',
        'job_qualifications', 'work_hours', 'company_size', 'job_desc'
    ]]

    results = filtered_df.sort_values(by='score', ascending=False).to_dict(orient='records')
    job_types = sorted(set(job['job_type'] for job in results if job['job_type']))

    return jsonify({'results': results, 'job_types': job_types, 'message': None})

if __name__ == '__main__':
    app.run(debug=True, port=5004)
