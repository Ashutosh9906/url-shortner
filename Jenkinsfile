pipeline {
    agent any

    environment {
        DOCKER_IMAGE = 'url-shortener:1.0'
        PATH = "C:\\Users\\srkha\\AppData\\Local\\Programs\\DockerDesktop\\resources\\bin;${env.PATH}"
    }

    stages {
        stage('Checkout') {
            steps {
                echo 'Jenkins automatic polling test'
            }
        }

        stage('Install Dependencies') {
            steps {
                bat 'npm.cmd install'
            }
        }

        stage('Validate JavaScript') {
            steps {
                bat 'node --check index.js'
            }
        }

        stage('Verify Application') {
            steps {
                bat 'node --version'
                bat 'npm.cmd --version'
            }
        }

        stage('Build Docker Image') {
            steps {
                bat 'docker version'
                bat 'docker build -t %DOCKER_IMAGE% .'
            }
        }
    }
}