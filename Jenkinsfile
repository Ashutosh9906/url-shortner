pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps {
                echo 'Source code checked out by Jenkins'
            }
        }

        stage('Install Dependencies') {
            steps {
                bat 'npm.cmd install'
            }
        }

        stage('Verify Application') {
            steps {
                bat 'node --version'
                bat 'npm.cmd --version'
            }
        }
    }
}