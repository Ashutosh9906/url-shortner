
pipeline {
    agent any

    environment {
        DOCKER_IMAGE = 'anushakhadse/url-shortener:1.0'
        PATH = "C:\\Users\\srkha\\AppData\\Local\\Programs\\DockerDesktop\\resources\\bin;${env.PATH}"
    }

    stages {
        stage('Checkout') {
            steps {
                echo 'Checking out URL Shortener project'
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
                    credentialsId: 'dockerhub-system-creds',
                    usernameVariable: 'DOCKERHUB_USER',
                    passwordVariable: 'DOCKERHUB_TOKEN'
                )]) {
                    bat '''
@echo off
echo %DOCKERHUB_TOKEN%| docker login -u %DOCKERHUB_USER% --password-stdin
if errorlevel 1 exit /b 1
docker push %DOCKER_IMAGE%
if errorlevel 1 exit /b 1
docker logout
'''
                }
            }
        }

        stage('Check Kubernetes Access') {
            environment {
                KUBECONFIG = 'C:\\ProgramData\\Jenkins\\kube\\config'
            }
            steps {
                bat 'kubectl config current-context'
                bat 'kubectl get nodes'
                bat 'kubectl get deployments'
            }
        }
    }
}
