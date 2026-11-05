const moduleTopics = [
  ['Introduction to Modern Automotive Technology', 'Compare conventional, BS6 and electric vehicle systems.', 'Modern vehicles combine mechanical systems with sensors, electronic controls and cleaner powertrains. A technician needs both hands-on repair skills and a safe diagnostic process.'],
  ['BS6 Emission Standards', 'Identify common exhaust after-treatment components.', 'BS6 Phase 2 vehicles use advanced emission controls. Diesel systems may include EGR, a diesel particulate filter (DPF) and selective catalytic reduction (SCR).'],
  ['Diesel Fuel Injection Systems', 'Explain how fuel is delivered and atomized.', 'The injection system meters fuel at the correct pressure and timing. Clean fuel, sound filters and careful high-pressure safety practices protect performance and components.'],
  ['Common Rail Direct Injection (CRDI)', 'Describe the rail, injectors and electronic control.', 'CRDI stores pressurized fuel in a common rail. The ECU commands each injector, enabling precise injection timing and quantity across operating conditions.'],
  ['OBD Scanner Fundamentals', 'Read codes and inspect live data responsibly.', 'An OBD scanner communicates with vehicle control modules. A code is a clue, not a component diagnosis; verify it with live data, wiring checks and the service procedure.'],
  ['Automotive Sensors', 'Recognize common engine sensor signals.', 'Sensors report conditions such as temperature, pressure, speed and oxygen content. The ECU uses these inputs to adjust engine operation and emissions.'],
  ['Electronic Control Unit (ECU)', 'Trace the relationship between inputs, logic and outputs.', 'An ECU reads sensor inputs, applies calibrated logic and controls actuators. Diagnosis should follow wiring diagrams and avoid replacing modules without evidence.'],
  ['Electric Vehicle Fundamentals', 'Locate key EV components and explain energy flow.', 'A battery electric vehicle uses a traction battery, inverter, motor and control systems. High-voltage work requires training, isolation and appropriate PPE.'],
  ['EV Battery Technology', 'Describe battery packs and safe handling basics.', 'EV packs contain many cells grouped into modules. Their performance depends on temperature, state of charge and careful management; never open a pack without authorization.'],
  ['Battery Management System (BMS)', 'Explain how the BMS monitors battery health.', 'The BMS monitors cell voltage and temperature, estimates state of charge and coordinates protection. It helps keep the pack within safe operating limits.'],
  ['EV Motor and Controller', 'Follow the basic path from battery to wheel torque.', 'The inverter controls electrical power from the battery to the traction motor. Motor and controller diagnosis begins with safety checks and manufacturer procedures.'],
  ['Automotive Diagnostics', 'Use a repeatable, evidence-led troubleshooting sequence.', 'Confirm the concern, inspect safely, scan for codes, check live data, test the suspected circuit and verify the repair. Document findings clearly.'],
  ['Workshop Safety and Tools', 'Select PPE and tools for common workshop tasks.', 'Use task-appropriate PPE, secure the vehicle, isolate energy sources when needed and inspect tools before use. Follow workshop procedures and safety data guidance.'],
  ['Industry Requirements and Interview Preparation', 'Present practical skills and explain a repair clearly.', 'Employers value safe work, punctuality, communication and sound fundamentals. Prepare examples of practical tasks, explain your process and ask informed questions.'],
  ['Final Skill Assessment', 'Review learning and identify your next development goal.', 'Use your assessment results and completed lessons to choose a focused next step. A learning plan works best when progress is reviewed and updated regularly.'],
]

export const trainingModules = moduleTopics.map(([title, objective, content], index) => ({
  id: index + 1,
  title,
  objective,
  content,
  quiz: [
    { question: `What is a safe, useful first step when working on ${title.toLowerCase()}?`, options: ['Follow the relevant safety procedure and verify the concern', 'Skip checks and replace a part', 'Work without PPE', 'Ignore the service information'], answer: 0 },
    { question: 'A diagnostic trouble code should be treated as:', options: ['A clue that needs confirmation', 'Proof that one named part is broken', 'A reason to clear all data immediately', 'A replacement for inspection'], answer: 0 },
    { question: 'Good workshop documentation should record:', options: ['Findings, checks and repair verification', 'Only the vehicle colour', 'Nothing if a repair was successful', 'A guessed fault'], answer: 0 },
    { question: 'When a procedure involves a hazardous energy source, you should:', options: ['Use the approved isolation procedure and suitable PPE', 'Touch conductors to confirm power', 'Ask an untrained person to assist', 'Continue if the vehicle is switched off'], answer: 0 },
    { question: 'When should you consider a repair verified?', options: ['After the concern is retested and results are documented', 'Before beginning work', 'When a part is ordered', 'As soon as a warning is cleared'], answer: 0 },
  ],
}))
