const success_url = 'https://app.prolific.com/submissions/complete?cc=C1DWWVGO'

// ----->>>>> Paste code below this line from test HTML

var jsPsych = initJsPsych({
    show_progress_bar: true,
    override_safe_mode: true,
    on_finish: function () {
        window.location.href = success_url;
    },
});

var timeline = [];

var video_width = 1280;
var video_height = 720;
var required_flag = true

var window_size_test = {
  type: jsPsychBrowserCheck,
  minimum_width: video_width+10,
  minimum_height: video_height+10
};
timeline.push(window_size_test);

var preload = {
    type: jsPsychPreload,
    images: [
    'stimuli/instruct_eyecontact.jpeg',
    ],
    videos: [
    'https://ronaldcumbal.github.io/open_repository/videos/11_practice.mp4',
    'https://ronaldcumbal.github.io/open_repository/videos/12_practice.mp4',
    'https://ronaldcumbal.github.io/open_repository/videos/0_no.mp4',
    'https://ronaldcumbal.github.io/open_repository/videos/1_do.mp4',
    'https://ronaldcumbal.github.io/open_repository/videos/2_in.mp4',
    'https://ronaldcumbal.github.io/open_repository/videos/3_ex.mp4',
    ]
};
timeline.push(preload);

const trialVideos = jsPsych.randomization.shuffle([
   'https://ronaldcumbal.github.io/open_repository/videos/1_do.mp4',
   'https://ronaldcumbal.github.io/open_repository/videos/2_in.mp4',
   'https://ronaldcumbal.github.io/open_repository/videos/3_ex.mp4'
]);

trialVideos.unshift('https://ronaldcumbal.github.io/open_repository/videos/0_no.mp4');

const practiceVideos = [
    'https://ronaldcumbal.github.io/open_repository/videos/11_practice.mp4',
    // 'https://ronaldcumbal.github.io/open_repository/videos/12_practice.mp4'
];


/* ============================= Prolific ============================= */
var prolific = {
    type: jsPsychSurveyText,
    preamble: '<h2>Welcome to the experiment!</h2><p>If you come from <strong>Prolific</strong>, please write your unique Prolific ID here.<br> Otherwise, continue to the next page.</p>',
    questions: [
    {prompt: 'Prolific Id:', 
    required: false,
    name: 'prolific_id'}
    ],
    data: {trial_name: 'prolific_id'},
}
timeline.push(prolific);

/* ============================= Instructions ============================= */

var intructions = {
    type: jsPsychInstructions,
    pages: [
    '<style>p {text-align: justify}</style>'+
    '<style>img {max-width: 100%; max-height: 100%;}</style>'+
    '<style>.textbox {width: 768px;}</style>'+
    '<div class="textbox">'+
    '<h2>Special Permission</h2>'+
    '<p>'+
    'In this study, you’ll help us understand how pedestrians behave in traffic situations. '+
    'You will watch short videos that show how autonomous vehicles communicate with pedestrians. ' +
    '<br>'+
    '<br>'+
    'As part of the study, you’ll answer a few questions and complete a simple task while watching the videos. '+
    '<br>'+
    '<br>'+
    '</p>'+

    '</div>',
    ],
        show_clickable_nav: true,
        allow_backward: false,
        button_label_next: 'Continue',
}
timeline.push(intructions);

/* ============================= Background ============================= */
var background_info = {
    type: jsPsychInstructions,
    pages: [
    '<style>ul {text-align: justify}</style>'+
    '<style>p {text-align: justify}</style>'+
    '<style>img {max-width: 100%; max-height: 100%;}</style>'+
    '<style>.textbox {width: 896px;}</style>'+
    '<div class="textbox">'+
    '<h3>Communication with Autonomous Vehicles</h3>'+
    '<p>'+
    'Autonomous Vehicles (AV) are vehicles that can operate with little to no human input. '+
    'As AVs become part of everyday life, it’s essential for all road users —pedestrians, '+
    'drivers, cyclists, and others— to understand and interact with them effectively, '+
    'much like how people currently engage with human drivers. '+
    'These vehicles may use interfaces to communicate their intentions to help people understand an their actions. '+
    '<br><br>'+
    '<center><img src="stimuli/instruct_eyecontact.jpeg"></img></center>'+      '</p>'+
    '</div>',
    ],
        show_clickable_nav: true,
        allow_backward: false,
        button_label_next: 'Continue',
}
timeline.push(background_info);

/* ============================= Video Instruction ============================= */

var video_intructions = {
    type: jsPsychInstructions,
    pages: [
    '<style>p {text-align: justify}</style>'+
    '<style>img {max-width: 100%; max-height: 100%;}</style>'+
    '<style>.textbox {width: 768px;}</style>'+
    '<div class="textbox">'+
    '<h2>Main Task</h2>'+
    '<p>'+
    'You will watch a few short videos showing typical traffic situations from a <strong>pedestrian’s point of view</strong>. ' + 
    'In each situation, <strong>you will need to cross a street</strong> in an area without proper traffic signals. ' +
    'Each video begins with you walking toward the street, looking right, and then left. As you get close to crossing, you will see a <strong>driver-less bus</strong> approaching from the left. '+
    'Your main task is: '+
    '<br><br>'+
    '<strong>After you see the driver-less bus approaching from the left, press the ENTER key when you feel it is safe to CROSS the street</strong>.' +
    '<br>'+
    '<br>'+
    'After each videos, you will complete a short questionnaire about your experience.' +
    '</p>'+
    '</div>',
    ],
        show_clickable_nav: true,
        allow_backward: false,
        button_label_next: 'Continue',
}
timeline.push(video_intructions);

/* ============================= Video Practice and Test ============================= */

var practice_intro = {
type: jsPsychInstructions,
pages: [
    '<style>p {text-align: center}</style>'+
    '<style>img {max-width: 100%; max-height: 100%;}</style>'+
    '<style>.textbox {width: 768px;}</style>'+
    '<div class="textbox">'+
    '<p>'+
    'Let’s begin with a practice trial.'+
    '<br>'+
    '<br>'+
    'We will use a sample video similar to the ones you will see later. '+
    '<br>'+
    'In this case we use a driver-less vehicle, not the driver-less bus. '+ 
    '</p>'+
    '</div>',
    ],
    show_clickable_nav: true,
    allow_backward: false,
    button_label_next: 'Continue',
}
timeline.push(practice_intro);

practiceVideos.forEach(function(video) {
    var practice_trial = {
    type: jsPsychVideoKeyboardResponse,
    stimulus: [video],
    choices: ['Enter'],
    trial_ends_after_video: true,
    response_allowed_while_playing: true,
    response_ends_trial: false,
    autoplay: true,
    width: video_width,
    height: video_height,
    prompt: `
        <p></p>
        <p>
        When you see the vehicle approaching, press the <strong>ENTER key</strong> when you feel it is safe to <strong>CROSS the street</strong>. 
        <br>
        ` ,
    on_load: function() {
    // Create feedback element
    const feedback = document.createElement('div');
    feedback.id = 'key-feedback';
    feedback.style.position = 'absolute';
    feedback.style.top = '10%';
    feedback.style.left = '50%';
    feedback.style.transform = 'translateX(-50%)';
    feedback.style.fontSize = '32px';
    feedback.style.fontWeight = 'bold';
    feedback.style.color = 'red';
    feedback.style.display = 'none'; // Hidden by default
    document.body.appendChild(feedback);

    document.addEventListener('keydown', showFeedback);

    function showFeedback(e) {
        if (['Enter'].includes(e.key)) {
        feedback.textContent = 'Key pressed, thanks!';
        feedback.style.display = 'block';
        setTimeout(() => {
            feedback.style.display = 'none';
        }, 500);
        }
    }

    // Clean up after trial ends
    jsPsych.getCurrentTrial().on_finish = function() {
        document.removeEventListener('keydown', showFeedback);
        const oldFeedback = document.getElementById('key-feedback');
        if (oldFeedback) oldFeedback.remove();
    };
        }
    };
    timeline.push(practice_trial);

    var feedbackTrial = {
    type: jsPsychHtmlKeyboardResponse,
    choices: [' '],
    stimulus: function() {
    const last_rt = jsPsych.data.get().last(1).values()[0].rt;
    if (last_rt === null) {
        return "<p><strong>No response detected</strong>.<br>Stay focused when the actual task begins.</p><p>Press the SPACE BAR to continue.</p>";
    } else if (last_rt >= 3000 && last_rt <= 5000) {
        return "<p>Great! Your test response time has been recorded.</p><p>Press the SPACE BAR to continue.</p>";
    } else {
        return "<p>Your response time was outside the typical range.<br>Please stay focused when the actual task begins.</p><p>Press the SPACE BAR to continue.</p>";
    }
    }
    };
    timeline.push(feedbackTrial);      
});

/* ============================= Video Response ============================= */

var video_intructions = {
type: jsPsychInstructions,
pages: [
    '<style>p {text-align: justify}</style>'+
    '<style>img {max-width: 100%; max-height: 100%;}</style>'+
    '<style>.textbox {width: 768px;}</style>'+
    '<div class="textbox">'+
    '<p>'+
    'We are ready to start! Remember, for each video: '+
    '<br><br>'+
    'When you see the driver-less bus approaching from the left, press the <strong>ENTER key</strong> when you feel it is safe to <strong>CROSS the street</strong>.' +
    '</p>'+
    '</div>',
    ],
    show_clickable_nav: true,
    allow_backward: false,
    button_label_next: 'Continue',
}
timeline.push(video_intructions);


trialVideos.forEach(function(video) {
    var video_trial = {
    type: jsPsychVideoKeyboardResponse,
    stimulus: [video],
    choices: ['Enter'],
    trial_ends_after_video: true,
    response_allowed_while_playing: true,
    response_ends_trial: false,
    autoplay: true,
    width: video_width,
    height: video_height,
    prompt: `
        <p></p>
        <p>
        When you see the vehicle approaching, press the <strong>ENTER key</strong> when you feel it is safe to <strong>CROSS the street</strong>. 
        <br>
        ` ,
    data: {trial_name: 'video_trial'},
    on_load: function() {
    // Create feedback element
    const feedback = document.createElement('div');
    feedback.id = 'key-feedback';
    feedback.style.position = 'absolute';
    feedback.style.top = '10%';
    feedback.style.left = '50%';
    feedback.style.transform = 'translateX(-50%)';
    feedback.style.fontSize = '32px';
    feedback.style.fontWeight = 'bold';
    feedback.style.color = 'red';
    feedback.style.display = 'none'; // Hidden by default
    document.body.appendChild(feedback);

    document.addEventListener('keydown', showFeedback);

    function showFeedback(e) {
        if (['Enter'].includes(e.key)) {
        feedback.textContent = 'Key Pressed';
        feedback.style.display = 'block';
        setTimeout(() => {
            feedback.style.display = 'none';
        }, 500);
        }
    }

    // Clean up after trial ends
    jsPsych.getCurrentTrial().on_finish = function() {
        document.removeEventListener('keydown', showFeedback);
        const oldFeedback = document.getElementById('key-feedback');
        if (oldFeedback) oldFeedback.remove();
    };
    }
    };
    timeline.push(video_trial);

    var video_questionnaire = {
    type: jsPsychSurveyLikert,
    questions: [
        {
        prompt: "obstructive or supportive",
        labels: [" 1 - obstructive", "2", "3", "4", "5", "6", "7 - supportive"],
        name: 'obstructive_supportive', 
        required: required_flag
        },
        {
        prompt: "complicated or easy",
        labels: ["1 - complicated", "2", "3", "4", "5", "6", "7 - easy"],
        name: 'complicated_easy',
        required: required_flag
        },
        {
        prompt: "inefficient or efficient",
        labels: ["1 - inefficient", "2", "3", "4", "5", "6", "7 - efficient"],
        name: 'inefficient_efficient',
        required: required_flag
        },
        {
        prompt: "confusing or clear",
        labels: ["1 - confusing", "2", "3", "4", "5", "6", "7 - clear"],
        name: 'confusing_clear',
        required: required_flag
        },
        {
        prompt: "boring or exciting",
        labels: ["1 - boring", "2", "3", "4", "5", "6", "7 - exciting"],
        name: 'boring_exciting',
        required: required_flag
        },
        {
        prompt: "conventional or inventive",
        labels: ["1 - conventional", "2", "3", "4", "5", "6", "7 - inventive"],
        name: 'conventional_inventive',
        required: required_flag
        }
    ],
    preamble: "<p><strong>How would you rate your experience in the previous interaction?</strong><br>Don’t think too long about your decision.</p>",
    scale_width: 500,
    on_finish: function(data) {
        data.trial_name = "user_experience";
        data.video_file = jsPsych.timelineVariable('video', true);
    }
    };
    timeline.push(video_questionnaire);

    var video_question = {
    type: jsPsychSurveyText,
    questions: [
        {
        prompt: "Please briefly describe what made you understand (or not) the previous AV interface. (We use this answer as an attention check.)",  
        placeholder: "Type your answer here...",
        rows: 4,
        columns: 60,
        required: required_flag
        }
    ],
    on_finish: function(data) {
        data.trial_name = "interpretation";
        data.video_file = jsPsych.timelineVariable('video', true);
    }
    };
    timeline.push(video_question);

});


/* ============================= Demographics ============================= */

const demographics = {
type: jsPsychSurvey,
survey_json: {
    showQuestionNumbers: false,
    completeText: 'Continue',
    showCompletedPage: false,
    pages: [
    {
        name: 'page1',
        elements: [
        {
            type: 'text',
            title: 'How old are you?', 
            name: 'demo_age', 
            isRequired: required_flag,
            inputType: 'number',
            min: 0,
            max: 100,
            defaultValue: 0
        },
        {
            type: 'radiogroup',
            title: "What is your gender?", 
            name: 'demo_gender',
            isRequired: required_flag,
            choices: ['Female', 'Male', 'Non-binary', 'Prefer not to say'], 
            showNoneItem: false,
            showOtherItem: true,
            colCount: 0,
        },
        {
            type: 'radiogroup',
            title: "What is your primary mode of transportation?", 
            name: 'demo_transp_mode',
            isRequired: required_flag,
            choices: ['Private vehicle','Public transportation',"Motorcycle", "Walking/Cycling", "Other", "I prefer not to respond"], 
            showNoneItem: false,
            showOtherItem: false,
            colCount: 0,
        },
                        {
            type: 'radiogroup',
            title: "I plan to use self-driving vehicles when they become available.", 
            name: 'demo_attitude',
            isRequired: required_flag,
            choices: ['Strongly Disagree','Disagree', 'Neutral', 'Agree', 'Strongly Agree'], 
            showNoneItem: false,
            showOtherItem: false,
            colCount: 0,
        },
        {
            type: 'radiogroup',
            title: "In which type of place are you located now?", 
            name: 'demo_place',
            isRequired: required_flag,
            choices: ['Indoor','Outdoor', "I prefer not to respond"], 
            showNoneItem: false,
            showOtherItem: true,
            colCount: 0,
        },
        {
            type: 'radiogroup',
            title: "What is the lighting condition of the place you are located now?", 
            name: 'demo_lighting',
            isRequired: required_flag,
            choices: ['Dark','Dim light',"Bright light","I prefer not to respond"], 
            showNoneItem: false,
            showOtherItem: true,
            colCount: 0,
        }
        ]
    },
    ]
},
data: {trial_name: 'demographics'}
};
timeline.push(demographics);

/* ============================= Exit Survey ============================= */

var exit_survey = {
    type: jsPsychSurveyHtmlForm,
    html: `
    <style>
        p { text-align: left; }
        input[type="text"] { width: 8ch; }
        fieldset { border: 1px solid #999; box-shadow: 2px 2px 5px #999; }
        legend { background: #fff; text-align: left; font-size: 110%; }
    </style>
    <span style="font-size: 125%; font-weight: bold;">Exit Survey</span>
    <p>If you have feedback or comments on the study, please write them below:</p>
    <p style="text-align: left;">
        <textarea name="comments" rows="3" style="width: 90%;" placeholder="Your comments here..."></textarea>
    </p>
    `,
    button_label: 'Finish',
    data: {trial_name: 'exit_survey'}
};

timeline.push(exit_survey);

jsPsych.run(timeline);