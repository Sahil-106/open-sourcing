import os
import requests
from flask import Flask, jsonify
from flask_cors import CORS
from dotenv import load_dotenv



load_dotenv()

app = Flask(__name__)
CORS(app)

def extract_repo_info(repo):
    return {
        'name': repo['name'],
        'description': repo['description'],
        'url': repo['html_url'],
        'last Update': repo['updated_at'],
        'tech_stack': repo['language']
    }


access_token=os.environ.get('git_token')
gitlab_access_token=os.environ.get('lab_token')
codeberg_access_token=os.environ.get('berg_token')

@app.route('/')
def index():
    return 'index page'



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
        if response.status_code == 200:
            repositories = response.json()['items']
            repo_info = [extract_repo_info(repo) for repo in repositories]
            return jsonify(repo_info)
        else:
            return f"Failed to fetch repositories: {response.status_code}", response.status_code
    except requests.exceptions.RequestException as e:
        return f"Error fetching repositories: {e}", 500



@app.route('/repogitlab')
def fetch_gitlab_open_source_repositories():
    headers = {
        'Private-Token': gitlab_access_token
    }
    url = 'https://gitlab.com/api/v4/projects'
    params = {
        'per_page': 100,
        'topics':'open-source',
        'order_by': 'last_activity_at',
        
    }
    
    try:
        response = requests.get(url, headers=headers, params=params)
        if response.status_code == 200:
            repositories = response.json()
            repo_info = [{
                'name': repo['name'],
                'description': repo['description'],
                'url': repo['web_url'],
                'last update':repo['last_activity_at']
            } for repo in repositories]
            return jsonify(repo_info)
        else:
            return f"Failed to fetch GitLab repositories: {response.status_code}", response.status_code
    except requests.exceptions.RequestException as e:
        return f"Error fetching GitLab repositories: {e}", 500

@app.route('/repocodeberg')
def fetch_codeberg_open_source_repositories():
    
    headers = {
        'Authorization': f'token {codeberg_access_token}'
    }
    url = 'https://codeberg.org/api/v1/repos/search?q=open-source'
    params = {
        'limit': 100
    }
    
    try:
        response = requests.get(url, headers=headers, params=params)
        if response.status_code == 200:
            repositories = response.json()['data']
          
            repo_info = [{
                'name': repo['name'],
                'description': repo['description'],
                'url': repo['html_url'],
                'last Update': repo['updated_at'],
                'tech_stack': repo.get('language') 
            } for repo in repositories]
            return jsonify(repo_info)
        else:
            return f"Failed to fetch Codeberg repositories: {response.status_code}", response.status_code
    except requests.exceptions.RequestException as e:
        return f"Error fetching Codeberg repositories: {e}", 500


if __name__ == '__main__':
    app.run()