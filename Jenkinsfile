pipeline {
    agent any
    tools { nodejs "8.9.4" }
    stages {
        stage('Build') {
            steps {
                sh 'npm install'
                sh 'cp ./src/server/config_default.js ./src/server/config.js'
                sh 'npm run build'
            }
        }
        stage('Test') {
            steps {
                sh "npm run pretest"
                sh "npm run test:xunit"
                sh "npm run posttest"
            }
        }
    }
    post {
        always {
            junit "test_results.xml"
            step([$class: 'CoberturaPublisher', coberturaReportFile: 'coverage/cobertura-coverage.xml'])
            sh 'rm -rf ./node_modules'
        }
    }
}
