import os
from flask import Flask, jsonify
from dotenv import load_dotenv
import pyodbc

load_dotenv()

app = Flask(__name__)

def get_db_connection():
    server = os.getenv('SQL_SERVER')
    database = os.getenv('SQL_DATABASE')
    username = os.getenv('SQL_USERNAME')
    password = os.getenv('SQL_PASSWORD')
    driver = os.getenv('SQL_DRIVER')
    conn_str = f'DRIVER={{{driver}}};SERVER={server};DATABASE={database};UID={username};PWD={password}'
    return pyodbc.connect(conn_str)

@app.route('/')
def home():
    return jsonify({'message': 'StabilityBench Flask API is running.'})

@app.route('/meters')
def get_meters():
    try:
        conn = get_db_connection()
        cursor = conn.cursor()
        cursor.execute('SELECT TOP 10 * FROM MeterDetails')  # Change table name as needed
        columns = [column[0] for column in cursor.description]
        results = [dict(zip(columns, row)) for row in cursor.fetchall()]
        cursor.close()
        conn.close()
        return jsonify(results)
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)
