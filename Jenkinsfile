pipeline {
  agent any

  environment {
    BACKEND_IMAGE = "flight-backend"
    FRONTEND_IMAGE = "flight-frontend"
  }

  stages {
    stage('Build Backend') {
      steps {
        dir('backend') {
          sh 'mvn clean package -DskipTests'
        }
      }
    }

    stage('Build Frontend') {
      steps {
        dir('frontend') {
          sh 'npm install'
          sh 'npm run build'
        }
      }
    }

    stage('Docker Build') {
      steps {
        sh 'docker build -t ${BACKEND_IMAGE} ./backend'
        sh 'docker build -t ${FRONTEND_IMAGE} ./frontend'
      }
    }

    stage('Docker Compose Up') {
      steps {
        sh 'docker-compose up -d --build'
      }
    }
  }

  post {
    always {
      echo 'Pipeline finished.'
    }
  }
}
