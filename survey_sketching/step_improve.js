const success_url = 'https://app.prolific.com/submissions/complete?cc=C14GAI2S'

var jsPsych = initJsPsych({
    show_progress_bar: true,
    override_safe_mode: true,
    on_finish: function () {
        window.location.href = success_url;
    }
})

// ----->>>>> Paste code below this line from test HTML

    var timeline = [];

    var required_flag = true
    var save_strokes_flag = true

    var canvas_width =  896
    var canvas_height = 640
    var canvas_border_width = 1
    var stroke_width = 1
    var stroke_color =  'blue'
    var stroke_color_palette = ['blue', 'red', 'yellow', 'green']

    var preload = {
      type: jsPsychPreload,
      images: [
        'images/instruct_eyecontact.jpeg',
        'images/instruct_designs.png',
        'images/concept_tree.png',
        'images/sketch_instruction.png',
        ],
    };
    timeline.push(preload);
    
    // List of images for creativity rating and selection dropdowns
    const random_images = ['R17.png', 'R19.png', 'R20.png', 'R25.png', 'R31.png', 'R32.png'];
    const update_images = [
      'B1',
      'B2',
      'B3',
      'C1',
      'C2',
      'D1',
      'R03',
      'R05',
      'R06',
      'R07',
      'R10',
      'R11',
      'R14',
      'R17',
      'R18',
      'R19',
      'R20',
      'R25',
      'R27',
      'R28',
      'R29',
      'R31',
      'R32',
    ];
    /* ============================= 2 Browser Check ============================= */

    var browser_info = {
      type: jsPsychBrowserCheck,
      on_finish: function(data) {
        jsPsych.data.addProperties({ browser: data.browser });
      }
    };

    // Intermediate warning page for unsupported browsers
    var browser_warning = {
      type: jsPsychHtmlButtonResponse,
      stimulus: `<p>You must use Chrome, Opera, Brave, or Safari to complete this experiment.</p>`,
      choices: ['OK'],
      on_finish: function() {
        window.location.href = "about:blank"; // Redirects away to prevent further progress
      }
    };

    // Conditional timeline to show warning page if browser is unsupported
    var check_browser_and_warn = {
      timeline: [browser_warning],
      conditional_function: function() {
        var browser = jsPsych.data.getLastTrialData().values()[0].browser;
        return !['Chrome','chrome', 'Opera', 'opera', 'Brave', 'brave', 'Safari', 'safari'].includes(browser);
      }
    };

    // Push to timeline
    timeline.push(browser_info, check_browser_and_warn);

    /* ============================= 3 Sketch Validation ============================= */
    var free_sketch = {
      type: modifiedjsPsychSketchpad,
      prompt: '<h3>Browser Compatibility Test</h3>'+
              '<p>Please draw any shape in the space below and press Finished.<br>'+
              'This test ensures your browser is compatible with our online survey.<br>'+
              'If you are unable to proceed, we recommend leaving this website.</p>',
      canvas_width: 240,
      canvas_height: 240,
      canvas_border_width: 1,
      stroke_color_palette: ['black'],
      trial_duration: 30000,
      show_countdown_trial_duration: true,
      save_strokes: false,
      background_image: "https://ronaldcumbal.github.io/open_repository/images/test.png",
    }
    timeline.push(free_sketch);

    /* ============================= 4 Prolific ============================= */
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
      '<h2>Your Tasks</h2>'+
      '<p>'+
      'In this study, you will help us explore how autonomous vehicles (AVs) can communicate effectively with people. '+
      '<strong>Your tasks will include answering questions and sketching your own design ideas</strong>. ' +
      'Your contribution could play a valuable role in shaping future recommendations for communication interface designs. '+
      '</p>'+
      '<p>'+
      "Let’s start with a few background questions. "+
      '</p>'+
      '</div>',
      ],
        show_clickable_nav: true,
        allow_backward: false,
        button_label_next: 'Continue',
    }
    timeline.push(intructions);

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
                choices: ['Private vehicle (car, van, etc.)','Public transportation (bus, train, etc.)',"Motorcycle", "Walking/Cycling", "Other", "I prefer not to respond"], 
                showNoneItem: false,
                showOtherItem: false,
                colCount: 3,
              },
              {
                type: 'radiogroup',
                title: "Have you ever had any interaction with a self-driving vechile(e.g., crossing its path, riding in one, or communicating with it)?", 
                name: 'demo_experience_interact',
                isRequired: required_flag,
                choices: ['No','Yes',"I'm not sure"], 
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
              }
          ]
        },
      ]
    },
    data: {trial_name: 'demographics'}
    };
    timeline.push(demographics);

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
      '<br><br>'+
      '<center><img src="images/instruct_eyecontact.jpeg"></img></center>'+
      '</p>'+
        '</div>',
      ],
        show_clickable_nav: true,
        allow_backward: false,
        button_label_next: 'Continue',
    }
    timeline.push(background_info); 

    /* ============================= Previous Designs ============================= */
    var previous_designs = {
    type: jsPsychInstructions,
    pages: [      
      '<style>p {text-align: justify}</style>'+
      '<style>img {max-width: 100%; max-height: 100%;}</style>'+
      '<style>.textbox {width: 1024px;}</style>'+
      '<div class="textbox">'+
      '<h3>Detecting Pedestrians in a High-Risk Scenario</h3>'+
      '<p>'+
      'In a previous study, participants sketched how AVs might communicate with road users in different risk scenarios. '+
      'We grouped these sketches into key concepts shown in the top layer of the visualization tree below. '+
      'New participants then viewed these concepts, submitted additional sketches with suggested improvements, creating new branches in the tree. '+
      '<br>'+
      "(If you don't see any branches, you are starting a new iteration! :) )"+
      '<br>'+
      '<br>'+
      '<img src="images/concept_tree.png"></img>'+
      '</p>'+
      '</div>',
      ],
        show_clickable_nav: true,
        allow_backward: false,
        button_label_next: 'Continue',
    }
    timeline.push(previous_designs);    


    /* ============================= Creativity Rating ============================= */


    random_images.forEach(function(img) {
      // extract image name without extension for variable naming
      const img_name = img.split('.')[0];

      timeline.push({
        type: jsPsychSurveyLikert,
        preamble: `<img src="${img}" style="max-width:500px; display:block; margin:auto;">`,
        questions: [
          {
            prompt: "How creative is the idea behind this submitted interface (focus on the idea, not the drawing skills)?",
            labels: [
              "1 - Not original at all",
              "2",
              "3",
              "4",
              "5",
              "6",
              "7 - Extremely original"
            ],
            required: true
          }
        ],
        data: {trial_name: 'rate_creativity', image_shown: img },
      });
    });


    /* ============================= Task Description ============================= */
    var task_description = {
    type: jsPsychInstructions,
    pages: [      
      '<style>p {text-align: justify}</style>'+
      '<style>img {max-width: 100%; max-height: 100%;}</style>'+
      '<style>.textbox {width: 896px;}</style>'+
      '<div class="textbox">'+
      '<h3>Task: Sketch Modifications, Improvements or New Ideas</h3>'+
      '<p>'+
      'Your task is to be creative. '+
      "You will sketch your own idea for a communication interface for an autonomous vehicle, based on other participants' ideas. "+
      'You can <strong>add new elements, combine existing ones, or create a design from scratch</strong>. '+
      "Your interface should clearly show <strong>how an AV detects and recognizes a pedestrian's intentions.</strong> " +
      '<br>'+
      '<br>'+
      'The image below highlights the key elements of the sketching canvas you will use.'+
      '<br>'+
      '<center><img src="images/sketch_instruction.png"></img></center>'+
      '</p>'+
      '</div>',
      ],
        show_clickable_nav: true,
        allow_backward: false,
        button_label_next: 'Continue',
    }
    timeline.push(task_description);    

    /* ============================= Open Question (Low Risk) ============================= */

    var low_risk_comment = {
      type: jsPsychSurveyHtmlForm,
      button_label: 'Continue',
      html: 
          '<style>'+
          'p {text-align: left; spellcheck: false; width:896px}'+
          'input[type="text"]'+
          'fieldset { border: 1px solid #999; box-shadow: 2px 2px 5px #999;}'+
          '</style>'+
          '<span style="font-size: 125%; font-weight: bold;">'+
          '</span>'+
          '<h3>Low-risk Scenario</h3>'+
          '<p>'+
          "Before sketching, consider a <strong>low-risk scenario</strong>: "+
          'You are a pedestrian about to cross a street with <strong>clear visibility, minimal traffic, and well-marked signals</strong>. '+
          'In this situation, what elements or features would you like to see in an AV’s interface? '+
          'How would you like the AV to communicate with you? <br>Please write a short answer below:'+
          '</p>'+
          '<p style="text-align: left;">'+
          '<textarea name="low_risk_comment" rows="10" style="width: 99%;" required></textarea>'+
          'This answer will be used as an attention check.<br><br>'+
          '</p>',
          data: {trial_name: 'low_risk_comment'}
    };
    timeline.push(low_risk_comment);


    /* ============================= High Risk Reflection ============================= */

    var reflection_questions = [
        "- How can an AV get a distracted pedestrian’s attention without using sound?",
        "- How can an AV show it sees multiple pedestrians at once?",
        "- How might an AV adjust signals for children or older adults?",
        "- How could motion or lights help the AV grab attention from any angle?",
        "- What should the AV do if a parent with a stroller steps off the curb in heavy rain?",
        "- What if two kids on opposite sides step toward the street in heavy rain?",
        "- How should the AV respond if a cyclist dismounts to cross in the rain?"
    ];

    // Shuffle the questions each time
    function shuffle(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }

    // Create shuffled questions HTML
    shuffle(reflection_questions);
    var questions_html = reflection_questions.map(q => "<br>" + q).join('');

    var high_risk_reflection = {
        type: jsPsychSurveyHtmlForm,
        button_label: 'Continue',
        html:
            '<style>' +
            'p {text-align: left; spellcheck: false; width:896px}' +
            'input[type="text"]' +
            'fieldset { border: 1px solid #999; box-shadow: 2px 2px 5px #999;}' +
            '</style>' +
            '<h3>High-risk Scenario</h3>' +
            '<p>' +
            'Now, think about a <strong>high-risk scenario:</strong> ' +
            'You are a pedestrian in a <strong>busy urban area with limited visibility, no clear traffic infrastructure, and the presence of vulnerable pedestrians (e.g., children)</strong>. ' +
            'Consider the following questions:<br>' +
            questions_html +
            '<br><br>How would you like to update your design? <br>Please write a short answer below:' +
            '</p>' +
            '<p style="text-align: left;">' +
            '<textarea name="high_risk_reflection" rows="10" style="width: 99%;" required></textarea>' +
            '<br>This answer will be used as an attention check.<br><br>' +
            '</p>',
        data: { trial_name: 'high_risk_reflection' }
    };

    timeline.push(high_risk_reflection);

    /* ============================= Canvas Intro ============================= */

    var example_ideas = [
        "- Traffic lights could talk to AVs for smoother crossings.",
        "- Sidewalks could light up or vibrate when safe to cross.",
        "- Phones and smartwatches could alert AVs to pedestrians.",
        "- Pedestrians could wave, and AVs would recognize it.",
        "- Light robotic arms could guide traffic when needed.",
        "- AVs could slightly change shape to signal their next move.",
        "- Nearby AVs could share info to help each other.",
        "- Smart canes could tell visually impaired people when to cross safely."
    ];    

    // Shuffle function
    function shuffle(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }

    // Shuffle the example ideas each time
    shuffle(example_ideas);

    // Build the HTML for the shuffled ideas
    var ideas_html = example_ideas.map(idea => "<br>" + idea).join('');

    var canvas_intro = {
        type: jsPsychHtmlButtonResponse,
        stimulus:
            '<style>p {text-align: justify}</style>' +
            '<style>img {max-width: 100%; max-height: 100%;}</style>' +
            '<style>.textbox {width: 896px;}</style>' +
            '<div class="textbox">' +
            '<h3>Task: Sketch Your Idea on a High-risk Scenario</h3>' +
            '<p>' +
            'On the next page, you will choose a previous design to update or you can create a new design from scratch. ' +
            '<strong>Sketch your ideas based on the reflection of a high-risk scenario</strong>. ' +
            '<br><br><strong>Be creative!</strong> Think about how you would envision the near future, for example: <br>' +
            ideas_html +
            '</p>' +
            '</div>',
        choices: ['Continue'],
    };

    timeline.push(canvas_intro);    

     /* ============================= Select image ============================= */

    var select_image = {
      type: jsPsychHtmlKeyboardResponse,
      stimulus: `
        <style>
          p {text-align: justify;}
          .textbox {width: 1600px; margin: auto;}
          .zoom-wrapper {
            width: 1600px;
            height: 700px;
            overflow: hidden;
            position: relative;
            border: 1px solid #ccc;
            margin: auto;
          }
          .zoom-wrapper img {
            position: absolute;
            top: 0; left: 0;
            transition: transform 0.2s;
            cursor: grab;
          }
          .zoom-buttons {
            text-align: center;
            margin-top: 10px;
          }
          .zoom-buttons button {
            margin: 5px;
          }
        </style>
        <div class="textbox">
          <h3>Task: Sketch modifications or improvements</h3>
          <p>
            Please select one design you would like to improve, modify, or combine with another idea. 
            If you prefer, you may also choose to create a new design from scratch. 
            (<strong>Zoom-in</strong> to start interacting with the image).
          </p>
          <center>
            <div class="zoom-wrapper" id="zoom-wrapper">
              <img id="zoomable-image" src="images/concept_tree.png">
            </div>
            <div class="zoom-buttons">
              <button id="zoom-in-btn" type="button">Zoom In</button>
              <button id="zoom-out-btn" type="button">Zoom Out</button>
              <button id="reset-zoom-btn" type="button">Reset Zoom</button>
            </div>
          </center>
          <p style="text-align:center;">
            <label for="action_select">Select action:</label>
            <select id="action_select">
              <option value="">--Please choose an option--</option>
              <option value="modify">Modify a previous idea</option>
              <option value="create_new">Create New</option>
            </select>
          </p>
          <div id="extra_inputs" style="text-align:center; margin-top:10px;"></div>
        </div>
        <button id="continue-button" type="button" style="margin-top:20px; font-size:18px;">Continue</button>
      `,
      choices: "NO_KEYS", // disable default key triggers
      data: { trial_name: "select_image" },
      on_load: function() {
        const img = document.getElementById('zoomable-image');
        const wrapper = document.getElementById('zoom-wrapper');
        let scale = 1;
        let posX = 0;
        let posY = 0;
        let isDragging = false;
        let startX, startY;

        function updateTransform() {
          img.style.transform = `translate(${posX}px, ${posY}px) scale(${scale})`;
        }

        document.getElementById('zoom-in-btn').addEventListener('click', () => {
          scale = Math.min(scale * 1.1, 5);
          updateTransform();
        });
        document.getElementById('zoom-out-btn').addEventListener('click', () => {
          scale = Math.max(scale / 1.1, 1);
          posX = 0;
          posY = 0;
          updateTransform();
        });
        document.getElementById('reset-zoom-btn').addEventListener('click', () => {
          scale = 1;
          posX = 0;
          posY = 0;
          updateTransform();
        });

        // Panning
        img.addEventListener('mousedown', (e) => {
          if (scale === 1) return; // no panning if not zoomed
          isDragging = true;
          startX = e.clientX - posX;
          startY = e.clientY - posY;
          img.style.cursor = 'grabbing';
          e.preventDefault();
        });
        document.addEventListener('mouseup', () => {
          isDragging = false;
          img.style.cursor = 'grab';
        });
        document.addEventListener('mousemove', (e) => {
          if (!isDragging) return;
          posX = e.clientX - startX;
          posY = e.clientY - startY;
          updateTransform();
        });

        // Dropdown dynamic behavior
        const actionSelect = document.getElementById('action_select');
        const extraInputs = document.getElementById('extra_inputs');

        console.log("Available options for modify and combine:", update_images);
        
        const modifyOptions = update_images
        const combineOptions = update_images

        actionSelect.addEventListener('change', function() {
          extraInputs.innerHTML = ''; // Clear previous

          if (this.value === 'modify') {
            const label = document.createElement('label');
            label.textContent = 'Select visualization to modify: ';
            const select = document.createElement('select');
            select.id = 'modify_select';
            modifyOptions.forEach(opt => {
              const option = document.createElement('option');
              option.value = opt;
              option.textContent = opt;
              select.appendChild(option);
            });
            extraInputs.appendChild(label);
            extraInputs.appendChild(select);
          } else if (this.value === 'combine') {
            const label1 = document.createElement('label');
            label1.textContent = 'Select first idea to combine: ';
            const select1 = document.createElement('select');
            select1.id = 'combine_select_1';
            combineOptions.forEach(opt => {
              const option = document.createElement('option');
              option.value = opt;
              option.textContent = opt;
              select1.appendChild(option);
            });

            const label2 = document.createElement('label');
            label2.textContent = ' Select second idea to combine: ';
            const select2 = document.createElement('select');
            select2.id = 'combine_select_2';
            combineOptions.forEach(opt => {
              const option = document.createElement('option');
              option.value = opt;
              option.textContent = opt;
              select2.appendChild(option);
            });

            extraInputs.appendChild(label1);
            extraInputs.appendChild(select1);
            extraInputs.appendChild(document.createElement('br'));
            extraInputs.appendChild(label2);
            extraInputs.appendChild(select2);
          }
        });

        document.getElementById('continue-button').addEventListener('click', function() {
          const actionElem = document.getElementById('action_select');
          const action = actionElem ? actionElem.value : '';
    
          let selected_images = [];
          let updates = {
            action_selected: action,
            selected_images_list: [],
          };
    
          if (action === 'modify') {
            const mod_elem = document.getElementById('modify_select');
            if (mod_elem && mod_elem.value) {
              selected_images = [mod_elem.value];
              updates.modify_target = mod_elem.value;
            }
          } else if (action === 'combine') {
            const comb1_elem = document.getElementById('combine_select_1');
            const comb2_elem = document.getElementById('combine_select_2');
            if (comb1_elem && comb2_elem && comb1_elem.value && comb2_elem.value) {
              selected_images = [comb1_elem.value, comb2_elem.value];
              updates.combine_target_1 = comb1_elem.value;
              updates.combine_target_2 = comb2_elem.value;
            }
          } else if (action === 'create_new') {
            selected_images = [];
          }
    
          updates.selected_images_list = selected_images;
    
          jsPsych.data.addProperties(updates);
          console.log("Captured selections before trial end:", updates);
    
          jsPsych.finishTrial(updates);
        });
      },
    };

    timeline.push(select_image);



     /* ============================= Free Sketch (High Risk) ============================= */

    var sketch_high_risk = {
      type: modifiedjsPsychSketchpad,
      prompt:
      '<h3>Task: Sketch your idea for an AV interface.</h3>' + 
      '<p>Sketch how an AV can clearly show that the AV has <strong>detected and understands a pedestrian’s intentions</strong>. </p>',
      canvas_width: canvas_width,
      canvas_height: canvas_height,
      canvas_border_width: canvas_border_width,
      stroke_color: stroke_color,
      stroke_color_palette: stroke_color_palette,
      show_countdown_trial_duration: true,
      save_strokes: save_strokes_flag,
      background_image: "https://ronaldcumbal.github.io/open_repository/images/sketch_high.png",
      on_load: function() {
          // === NEW CODE TO DISPLAY SELECTED IMAGES ===

          console.log(jsPsych.data.get().filter({trial_name: 'select_image'}).last(1).values()[0]);

          const last_data = jsPsych.data.get().filter({trial_name: 'select_image'}).last(1).values()[0] || {};
          console.log("Fetched last_data from select_image:", last_data);
      
          const selected_images = last_data.selected_images_list || [];
          console.log("selected_images_list in sketch_high_risk:", selected_images);


          if (selected_images.length > 0) {
              const container = document.createElement('div');
              container.style.textAlign = 'center';
              container.style.marginBottom = '10px';
              container.innerHTML = '<h4>Selected Images for Reference</h4>';

              selected_images.forEach(name => {
                  const img = document.createElement('img');
                  img.src = 'images/' + name + '.png'; // adjust naming if needed
                  img.style.maxWidth = '200px';
                  img.style.margin = '5px';
                  container.appendChild(img);
              });

              // Insert above the sketchpad
              const sketchpad = document.querySelector('canvas');
              if (sketchpad && sketchpad.parentNode) {
                  sketchpad.parentNode.insertBefore(container, sketchpad);
              } else {
                  document.body.insertBefore(container, document.body.firstChild);
              }
          }
      },
      on_finish: function(data) {
        data.trial_name = 'sketch_high_risk';
      }
    };
    timeline.push(sketch_high_risk);
    
    var sketching_high_comment = {
      type: jsPsychSurveyHtmlForm,
      button_label: 'Continue',
      preamble: () => {
          var prevImageData = jsPsych.data.get().last(1).values()[0].png;
          return `<img src="${prevImageData}" style="width:800px;"></img>`;
      },
      html: 
          '<style>p {text-align:left; spellcheck=false;} input[type="text"] {width:8ch;} fieldset {border:1px solid #999;box-shadow:2px 2px 5px #999;} legend {background:#fff;text-align:left;font-size:110%;}</style>'+
          '<span style="font-size:125%; font-weight:bold;"></span>'+
          '<p>Please briefly explain your design:'+
          '<br><br>What new elements did you include or modified?'+
          '<br>What motivated the changes you made?<br>'+
          '<p style="text-align:left;"><textarea name="sketching_high_comment" rows="10" style="width:99%;" required></textarea></p>'+
          'This answer will be used as an attention check.<br><br>',
      data: {trial_name: 'sketching_high_comment'}
    };
    timeline.push(sketching_high_comment);

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

        <p>Would you like to take part in a similar study in the future?</p>
        <p style="text-align: left;">
          <label><input type="radio" name="future_participation" value="Yes" required> Yes</label><br>
          <label><input type="radio" name="future_participation" value="No"> No</label><br>
          <label><input type="radio" name="future_participation" value="Maybe"> Maybe</label>
        </p>

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
