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

            echo "Resolved JDK path: ${jdkHome}"
            echo "Resolved Maven path: ${mavenHome}"

            withEnv([
                "JAVA_HOME=${jdkHome}",
                "PATH=${jdkHome}/bin:${mavenHome}/bin:${env.PATH}"
            ]) {
                dir('backend') {
                    sh 'echo $JAVA_HOME'
                    sh 'java -version'
                    sh 'mvn clean package -DskipTests'
                }
            }
        }
    }
}

                        }
                    }
                }
            }
        }
    }

    post {
        failure {
            echo "❌ Pipeline failed. Please check the logs."
        }
        success {
            echo "✅ Maven build completed successfully."
        }
    }
}
