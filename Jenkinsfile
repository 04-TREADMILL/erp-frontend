pipeline {
    agent any

    stages {

        stage('Install Deps and build project') {
            steps {
                sh 'rm -rf node_modules/'
                sh 'npm install'
                sh 'npm run build'
            }
        }

        stage('Run Unit Tests') {
            steps {
                sh 'npm test'
            }
        }

        stage('Deploy Project To Nginx') {
            steps {
                echo "Deploy project"
                sh "cp -rp dist/* /var/www/html/"
                sh 'service nginx restart'
                echo "success"
            }
        }

    }
}
