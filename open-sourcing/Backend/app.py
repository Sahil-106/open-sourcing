import os
import requests
from flask import Flask, jsonify
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)

def extract_repo_info(repo):
    return {
        'name': repo['name'],
        'description': repo['description'],
        'url': repo['html_url'],
        'tech_stack': repo['language']
    }
access_token=os.environ.get('GITHUB_API_KEY')
@app.route('/')
def index():
    return 'Hello, World!'

@app.route('/repositories')
def fetch_open_source_repositories():
    
    headers = {
        'Authorization': f'token {access_token}'
    }
    url = 'https://api.github.com/search/repositories'
    params = {
        'q': 'topic:open-source',
        'per_page': 100 
    }
    try:
        response = requests.get(url, headers=headers, params=params)
        # Check if the request was successful
        if response.status_code == 200:
            repositories = response.json()['items']
            repo_info = [extract_repo_info(repo) for repo in repositories]
            return jsonify(repo_info)
        else:
            return f"Failed to fetch repositories: {response.status_code}", response.status_code
    except requests.exceptions.RequestException as e:
        return f"Error fetching repositories: {e}", 500

if __name__ == '__main__':
    app.run(debug=True)
