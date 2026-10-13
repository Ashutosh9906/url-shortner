
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

        stage('Deploy to Kubernetes') {
            environment {
                KUBECONFIG = 'C:\\ProgramData\\Jenkins\\kube\\config'
            }
            steps {
                bat 'kubectl set image deployment/url-shortener url-shortener=%DOCKER_IMAGE%'
            }
        }

        stage('Verify Kubernetes Deployment') {
            environment {
                KUBECONFIG = 'C:\\ProgramData\\Jenkins\\kube\\config'
            }
            steps {
                bat 'kubectl rollout status deployment/url-shortener --timeout=180s'
                bat 'kubectl get pods'
                bat 'kubectl get services url-shortener mongo'
            }
        }
