pipeline {
    agent any

    triggers {
        pollSCM('H/2 * * * *')
    }

    environment {
        SELENIUM_REMOTE_URL = 'http://selenium:4444/wd/hub'
        APP_URL = 'http://jenkins:3000'
        JEST_JUNIT_OUTPUT_DIR = 'test-results'
    }

    stages {
        stage('Install Dependencies') {
            steps {
                sh 'npm install'
            }
        }

        stage('Start App') {
            steps {
                sh 'nohup node src/app.js > app.log 2>&1 &'
                sleep 5
            }
        }

        stage('UI Test') {
            steps {
                sh 'npx jest tests/e2e/home.test.js --runInBand --reporters=default --reporters=jest-junit'
            }
        }
    }

    post {
        always {
            junit testResults: 'test-results/*.xml', allowEmptyResults: true
        }
    }
}