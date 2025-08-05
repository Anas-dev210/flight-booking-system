pipeline {
    agent any

    tools {
        maven 'Maven 3.8.7' // Use the Maven version you installed in Jenkins
        jdk 'java 21'       // Also configure JDK under Global Tools
    }

    environment {
        APP_NAME = 'flight-app-backend'
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Build with Maven') {
            steps {
                dir('backend') {
                    sh 'mvn clean package -DskipTests'
                }
            }
        }

        stage('Run Tests') {
            steps {
                dir('backend') {
                    sh 'mvn test'
                }
            }
        }

        stage('Archive Artifact') {
            steps {
                dir('backend/target') {
                    archiveArtifacts artifacts: '*.jar', fingerprint: true
                }
            }
        }
    }

    post {
        success {
            echo "✅ Build and test completed successfully."
        }
        failure {
            echo "❌ Pipeline failed. Please check the logs."
        }
    }
}
