pipeline {
    agent any

    tools {
        maven 'Maven 3.8.7'
        jdk 'Java 21'
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
                    script {
                        def jdkHome = tool name: 'Java 21', type: 'jdk'
                        withEnv(["JAVA_HOME=${jdkHome}", "PATH=${jdkHome}/bin:${env.PATH}"]) {
                            sh 'mvn clean package -DskipTests'
                        }
                    }
                }
            }
        }

        stage('Run Tests') {
            steps {
                dir('backend') {
                    script {
                        def jdkHome = tool name: 'Java 21', type: 'jdk'
                        withEnv(["JAVA_HOME=${jdkHome}", "PATH=${jdkHome}/bin:${env.PATH}"]) {
                            sh 'mvn test'
                        }
                    }
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
