#!/bin/bash

# Define a function to perform the update and restart tasks
update_and_restart() {
    echo "Starting update and restart process..."

    # Navigate to your project directory
    cd /home/devtest/encrypted || exit

    # Pull the latest changes from the git repository
    echo "Pulling latest changes from git..."
    git pull origin main

    # Restart the React instance
    echo "Restarting React..."
    # Replace with your React restart command (e.g., pm2 restart or npm start)
    #pm2 restart react-app

    # Restart the Python instance
    echo "Restarting Python..."
    # Replace with your Python restart command (e.g., a systemd service restart)
    sudo systemctl restart  api.py

    echo "Update and restart process completed!"
}

# Schedule the job to run at the 55th minute of every hour using cron
schedule_job() {
    # Add the cron job to crontab
    (crontab -l ; echo "55 * * * * /home/devtest/getcode.sh") | crontab -
    echo "Cron job scheduled to run at the 55th minute of every hour."
}

# Run the scheduling function
schedule_job
