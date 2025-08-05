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
            def jdkHome = tool name: 'Java 21', type: 'jdk'
            def mavenHome = tool name: 'Maven 3.8.7', type: 'maven'

            echo "🔍 Resolved JAVA_HOME: ${jdkHome}"
            echo "🔍 Resolved Maven path: ${mavenHome}"

            dir('backend') {
                    sh '''
                    export JAVA_HOME=${jdkHome}
                    export PATH=${jdkHome}/bin:${mavenHome}/bin:$PATH
                
                    echo "🔎 JAVA_HOME=$JAVA_HOME"
                    java -version
                    mvn -version
                    mvn clean package -DskipTests
                '''

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
