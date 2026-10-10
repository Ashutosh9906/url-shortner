pipeline {
    agent any

    environment {
        DOCKER_IMAGE = 'anushakhadse/url-shortener:1.0'
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

        stage('Push to Docker Hub') {
            steps {
                withCredentials([usernamePassword(
                    credentialsId: 'dockerhub-creds',
                    usernameVariable: 'DOCKERHUB_USER',
                    passwordVariable: 'DOCKERHUB_TOKEN'
                )]) {
                    bat 'docker login -u %DOCKERHUB_USER% --password-stdin < nul'
                    bat 'echo %DOCKERHUB_TOKEN% | docker login -u %DOCKERHUB_USER% --password-stdin'
                    bat 'docker push %DOCKER_IMAGE%'
                    bat 'docker logout'
                }
            }

        stage('Push to Docker Hub') {
            steps {
                withCredentials([usernamePassword(
                    credentialsId: 'dockerhub-creds',
                    usernameVariable: 'DOCKERHUB_USER',
                    passwordVariable: 'DOCKERHUB_TOKEN'
                )]) {
                    bat '''
@echo off
echo %DOCKERHUB_TOKEN%| docker login -u %DOCKERHUB_USER% --password-stdin
docker push %DOCKER_IMAGE%
docker logout
'''
                }
            }
        }

        }
    }
}