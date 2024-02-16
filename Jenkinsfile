pipeline {
    agent any
    
    environment {
        FRONTEND_REPO_URL = 'https://github.com/rohanithapedxb999/investment_sem.git'
        FRONTEND_FOLDER_PATH = '/var/lib/jenkins/workspace/Application/finoms/investment_sem'
        def extracted_url = sh(script: 'grep -E "^app_url=" /var/lib/jenkins/workspace/Application/finoms/investment_sem_api/credential_no_duplicates.txt | awk -F "=" \'{print $2}\'', returnStdout: true).trim()
        
    }

    stages {
        stage('Read DB Name') {
            steps {
                script {
                    def db_name = sh(script: "tail -n2 /var/lib/jenkins/workspace/Application/finoms/investment_sem_api/db_name.txt | head -1", returnStdout: true).trim()
                    echo "The dynamic DB_NAME is: ${db_name}"
                    env.DB_NAME = db_name

                    def DB_FOLDER = sh(script: "tail -n2 /var/lib/jenkins/workspace/Application/finoms/investment_sem_api/db_name.txt | tail -1", returnStdout: true).trim()
                    echo "The dynamic DB_FOLDER is: ${DB_FOLDER}"
                    env.DB_FOLDER = DB_FOLDER
                }
            }
        }

        stage('Clone Frontend Repository') {
            steps {
                script {
                    withCredentials([usernamePassword(credentialsId: 'webhooks', usernameVariable: 'GIT_USERNAME', passwordVariable: 'GIT_PASSWORD')]) {
                        dir(FRONTEND_FOLDER_PATH) {
                            git branch: 'main', credentialsId: 'webhooks', url: FRONTEND_REPO_URL
                            sh 'export CI=false'
                        }
                    }
                }
            }
        }
		stage('Test') {
            steps {
                // Your test steps go here
                echo 'Sleeping for 1 minutes after the Test stage...'
                sleep time: 100, unit: 'SECONDS'
                echo 'Resuming pipeline execution...'
            }
        }
		stage('Copy Frontend Files') {
            steps {
                script {
                    sh "cp -r /var/lib/jenkins/workspace/Application/finoms/investment_sem /var/lib/jenkins/workspace/Application/${env.DB_FOLDER}/investment_sem"
                }
            }
        }
        stage('Extract Credentials') {
            steps {
                script {
                    def frontend_port = sh(script: "head -n1 /var/lib/jenkins/workspace/Application/finoms/investment_sem_api/ports.txt", returnStdout: true).trim()
					def backend_port = sh(script: "tail -n1 /var/lib/jenkins/workspace/Application/finoms/investment_sem_api/ports.txt", returnStdout: true).trim()
                    env.frontend_port = frontend_port
					env.backend_port = backend_port
                }
            }
        }

        stage('Replace Configuration in development.env') {
            steps {
                script {
                    def envFilePath = "/var/lib/jenkins/workspace/Application/${env.DB_NAME}/investment_sem/.env.development"
                    sh "rm -rf ${envFilePath}"

                    writeFile file: envFilePath, text: """
PORT = ${env.frontend_port}
REACT_APP_ENV = 'development'
REACT_APP_FRONTEND_URL = 'https://${extracted_url}/auth'
REACT_APP_API_KEY = 'https://${extracted_url}/api/v1'
                    """

                    echo "development.env file created with updated credentials."
                }
            }
        }
		stage('Give Execute Permissions to create_database.sh') {
            steps {
                script {
                    sh "chmod +x /var/lib/jenkins/workspace/Application/finoms/investment_sem/datainsertion.sh "
                }
            }
        }
		stage('Insert Data into Database') {
    steps {
        script {
            def dataInsertionScript = '/var/lib/jenkins/workspace/Application/finoms/investment_sem/datainsertion.sh'
            def credentialFile = '/var/lib/jenkins/workspace/Application/finoms/investment_sem_api/credential_no_duplicates.txt'

            // Update the path to your script and credential file
            sh "${dataInsertionScript} ${credentialFile}"
        }
    }
}        
        
        stage('Build frontend') {
            steps {
                dir("/var/lib/jenkins/workspace/Application/${env.DB_NAME}/investment_sem") {
                    sh "sudo ufw allow ${env.frontend_port}"
                    sh "sudo ufw allow ${env.backend_port}"
                    sh "sudo systemctl restart nginx"
                    sh 'npm install --legacy-peer-deps'
                    echo "DB_NAME: ${env.DB_NAME}"
                    sh "docker build -t '${env.DB_NAME}frontend' ."
                    echo "backend: ${env.frontend_port}"
                    sh "docker run -it -d -p ${env.frontend_port}:${env.frontend_port} '${env.DB_NAME}frontend'" 
                }
            }
        }
		
		stage('Extract Details') {
            steps {
                script {
                    // Extract values and assign to variables
                    def extracted_mail = sh(script: 'grep -E "^email=" /var/lib/jenkins/workspace/Application/finoms/investment_sem_api/credential_no_duplicates.txt | awk -F "=" \'{print $2}\'', returnStdout: true).trim()

                    // Display the extracted values
                    echo "Extracted Email: ${extracted_mail}"
                    echo "Extracted URL: ${extracted_url}"

                    // Use the extracted values in further stages or steps
                    // For example:
                    // deployApplication(email: extracted_mail, appUrl: extracted_url)
                    
                    // Send the email with specified body content
                    def sendEmailCommand = "echo -e \"To: ${extracted_mail}\\nSubject: Your Credentials Are Here\\n\\nMail: ${extracted_mail}\\nPassword: Password@123\\nURL: ${extracted_url}\\nNote - Your account is getting ready. Please wait for 5 minutes and then click the above URL.\" | ssmtp ${extracted_mail}"
                    echo "Sending email notification."
                    sleep time: 120, unit: 'SECONDS'
                    sh sendEmailCommand
                    echo "Sent email notification."
                }
            }
        }
    }

    post {
        failure {
            script {
                def emailSubject = "Pipeline ${currentBuild.result}"
                def emailBody = "The pipeline ${currentBuild.result}."
                def to = 'practiceuse2023@gmail.com'

                emailext subject: emailSubject,
                         body: emailBody,
                         to: to,
                         attachLog: true
            }
        }
    }
}
