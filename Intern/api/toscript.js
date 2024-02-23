    //time fxns 
    function redirectToHome() {
        // You can replace 'index.html' with the actual URL of your home page
        window.location.href = 'http://127.0.0.1:5500/api/home.html#';
    }
    const timeEle= document.querySelector(".time");
    const dateEle = document.querySelector(".dates")

    /**
     * @param {Date} date
     */

    function formattime(date){
        const hours12 = date.getHours() ;
        const min = date.getMinutes();
        const isam = date.getHours() < 12; 
        return `${hours12.toString().padStart(2, "0")}:${min.toString().padStart(2, "0")}`;
    }

    function formatdate(date){
        const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        const month = [
            'January',
            'February',
            'March',
            'April',
            'May',
            'June',
            'July',
            'August',
            'September',
            'October',
            'November',
            'December'
        ];
        
        return `${days[date.getDay()]}, ${month[date.getMonth()]} ${date.getDate()} ${date.getFullYear()}`; 
    }

    setInterval(() => {
        const now = new Date();

        timeEle.textContent = formattime(now);
        dateEle.textContent = formatdate(now);
    }, 200);




    window.addEventListener('load', () => {
        const form = document.querySelector("#new_form");
        const input = document.querySelector("#new_taskinput");
        const list_el = document.querySelector("#tasks");
        const totalTasksDisplay = document.querySelector("#totalTasks");
        const completedTasksDisplay = document.querySelector("#completedTasks");
        const openChartButton = document.querySelector("#openChartButton");
    const chartContainer = document.querySelector("#chartContainer");
    const closeChartButton = document.querySelector("#closeChartButton");

        // Load tasks from local storage when the page is loaded
        loadTasks();

        form.addEventListener('submit', (e) => {
            e.preventDefault();

            const task = input.value;
            if (!task) {
                alert("Please Fill Something!!");
                return;
            }

            // Retrieve the alarm time from the user
            const alarmTime = document.querySelector("#alarmTime").value;

            const task_el = createTaskElement(task, false, alarmTime);
            list_el.appendChild(task_el);

            // Save tasks to local storage
            saveTasks();

            input.value = "";
            document.querySelector("#alarmTime").value = ""; // Clear the alarm time input

            // Update task count displays
            updateTaskCount();
            updateChart();
        });

        openChartButton.addEventListener('click', () => {
            // Show the chart container
            chartContainer.style.display = "block";
        
            // Update the chart
            updateChart();
        });
        
        closeChartButton.addEventListener('click', () => {
            // Hide the chart container
            chartContainer.style.display = "none";
        });




        function createTaskElement(text, isCompleted, alarmTime) {
            const task_el = document.createElement("div");
            task_el.classList.add("task");

            const task_content_el = document.createElement("div");
            task_content_el.classList.add("content");

            task_el.appendChild(task_content_el);

            const task_input_el = document.createElement("input");
            task_input_el.classList.add("text");
            task_input_el.value = text;
            task_input_el.setAttribute("readonly", "readonly");

            // Toggle strike-through based on 'isCompleted' property
            if (isCompleted) {
                task_input_el.style.textDecoration = "line-through red";
            }

            task_content_el.appendChild(task_input_el);

            const task_actions_el = document.createElement("div");
            task_actions_el.classList.add("actions");

            const task_edit_el = document.createElement("button");
            task_edit_el.classList.add("edit");
            task_edit_el.innerHTML = "Edit";

            const task_delete_el = document.createElement("button");
            task_delete_el.classList.add("delete");
            task_delete_el.innerHTML = "x";

            task_actions_el.appendChild(task_edit_el);
            task_actions_el.appendChild(task_delete_el);

            task_el.appendChild(task_actions_el);

            // Add event listeners for edit, delete, and click actions
            task_edit_el.addEventListener('click', () => {
                toggleEditMode(task_input_el, task_edit_el);
            });

            task_delete_el.addEventListener('click', () => {
                list_el.removeChild(task_el);
                // Save tasks to local storage when deleted
                saveTasks();
                // Update task count displays
                updateTaskCount();
                updateChart();
            });

            task_content_el.addEventListener('click', () => {
                toggleStrikeThrough(task_input_el);
                // Save tasks to local storage when task is clicked
                saveTasks();
                // Update task count displays
                updateTaskCount();
                updateChart();
            });

            // Set up the alarm for the task
            setTaskAlarm(alarmTime, text);

            return task_el;
        }

        // Function to toggle strike-through
        function toggleStrikeThrough(element) {
            if (element.style.textDecoration === "line-through red") {
                element.style.textDecoration = "none";
            } else {
                element.style.textDecoration = "line-through red";
            }
        }

        // Function to toggle edit mode
        function toggleEditMode(element, editButton) {
            if (editButton.innerText.toLowerCase() == "edit") {
                element.removeAttribute("readonly");
                element.focus();
                editButton.innerText = "save";
            } else {
                element.setAttribute("readonly", "readonly");
                editButton.innerText = "Edit";
                // Save tasks to local storage when edited
                saveTasks();
            }
        }

    function setTaskAlarm(alarmTime, task) {
        const currentTime = new Date();
        const alarmDateTime = new Date(`${currentTime.toDateString()} ${alarmTime}`);

        // Calculate the time difference in milliseconds
        const timeDifference = alarmDateTime - currentTime;

        if (timeDifference > 0) {
            // Set a timeout for the alarm
            setTimeout(() => {
                // Play the sound and display an alert when the alarm time is reached
                playAlarmWithAlert(task);
            }, timeDifference);
        } else {
            // If the specified alarm time is in the past, display a warning
            console.warn("Warning: The specified alarm time is in the past.");
        }
    }

        function playAlarmWithAlert(task) {
            // Create an audio context
            const audioContext = new (window.AudioContext || window.webkitAudioContext)();
          //  const mp3Url = 'https://soundcloud.com/mariia-kiseleva/alarm?utm_source=clipboard&utm_medium=text&utm_campaign=social_sharing.mp3';
            // Load the audio file
            fetch('telephone-ring-03a.mp3')
                .then(response => response.arrayBuffer())
                .then(data => audioContext.decodeAudioData(data))
                .then(buffer => {
                    // Create an audio buffer source
                    const source = audioContext.createBufferSource();
                    source.buffer = buffer;

                    // Connect the source to the audio context's destination (speakers)
                    source.connect(audioContext.destination);

                    // Start the playback
                    source.start();

                    // Display an alert when the sound starts
                    alert(`Reminder: It's time to complete the task - ${task}`);
                })
                .catch(error => console.error("Error loading audio:", error));
        }


        
                    // Display an alert when the alarm time is reached
                

        // Function to save tasks to local storage
        function saveTasks() {
            const tasks = Array.from(list_el.children).map(task_el => {
                return {
                    text: task_el.querySelector('.text').value,
                    isCompleted: task_el.querySelector('.text').style.textDecoration === "line-through red"
                };
            });
            localStorage.setItem('tasks', JSON.stringify(tasks));
        }

        // Function to load tasks from local storage
        function loadTasks() {
            const storedTasks = localStorage.getItem('tasks');
            if (storedTasks) {
                const tasks = JSON.parse(storedTasks);
                tasks.forEach(task => {
                    const task_el = createTaskElement(task.text, task.isCompleted);
                    list_el.appendChild(task_el);
                });
                // Update task count displays
                updateTaskCount();
                updateChart();
            }
        }

        // Function to update task count displays
        
        function updateTaskCount() {
            const totalTasks = list_el.children.length;
            const completedTasks = Array.from(list_el.children).filter(task_el => {
                return task_el.querySelector('.text').style.textDecoration === "line-through red";
            }).length;


            totalTasksDisplay.textContent = totalTasks;
            completedTasksDisplay.textContent = completedTasks;
            
        }

        function updateChart() {
            
            const completedTasks = Array.from(list_el.children).filter(task_el => {
            return task_el.querySelector('.text').style.textDecoration === "line-through red";
            }).length;
        
            const remainingTasks = totalTasksDisplay.textContent - completedTasks;
        
            const accuracy = totalTasksDisplay.textContent > 0 ? (completedTasks / totalTasksDisplay.textContent) * 100 : 0;

    // Update the accuracy display
    const accuracyDisplay = document.getElementById('accuracyDisplay');
    accuracyDisplay.textContent = `Accuracy: ${accuracy.toFixed(2)}%`;

            // Update the doughnut chart
            const ctx = document.getElementById('doughnutChart').getContext('2d');
            new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: ['Completed Tasks', 'Remaining Tasks'],
                datasets: [{
                data: [completedTasks, remainingTasks],
                backgroundColor: [
                    'rgba(75, 192, 192, 0.7)',
                    'rgba(255, 99, 132, 0.7)',
                ],
                }],
            },
            options: {
                responsive: false, // Ensure that the chart does not respond to the size of its container
                maintainAspectRatio: false, // Do not maintain the aspect ratio
            }
            });
        }

    });



        


