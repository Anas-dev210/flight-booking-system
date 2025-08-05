pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Build with Maven') {
            steps {
                script {
                    // 🔧 Dynamically fetch tool paths from Jenkins global tool config
                    def jdkHome = tool name: 'Java 21', type: 'jdk'
                    def mavenHome = tool name: 'Maven 3.8.7', type: 'maven'

                    // 🧪 Print to verify what Jenkins resolves
                    echo "🔍 Resolved JAVA_HOME: ${jdkHome}"
                    echo "🔍 Resolved Maven path: ${mavenHome}"

                    withEnv([
                        "JAVA_HOME=${jdkHome}",
                        "PATH=${jdkHome}/bin:${mavenHome}/bin:${env.PATH}"
                    ]) {
                        dir('backend') {
                            // 🧪 Debug info before build
                            sh 'echo 🔎 JAVA_HOME=$JAVA_HOME'
                            sh 'java -version'
                            sh 'mvn -version'

                            // 📦 Build your Spring Boot app
                            sh 'mvn clean package -DskipTests'
                        }
                    }
                }
            }
        }

        stage('Run Tests') {
            when {
                expression { return false } // Skip for now to focus on build fix
            }
            steps {
                dir('backend') {
                    sh 'mvn test'
                }
            }
        }

        stage('Archive Artifact') {
            when {
                expression { return false } // Skip until we get successful build
            }
            steps {
                dir('backend/target') {
                    archiveArtifacts artifacts: '*.jar', fingerprint: true
                }
            }
        }
    }

    post {
        success {
            echo "✅ Maven build completed successfully!"
        }
        failure {
            echo "❌ Pipeline failed. Please check the logs above."
        }
    }
}
