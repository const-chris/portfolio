const recentWork = document.querySelector('#recent-work');
const backButton = document.querySelector('.back-button');
const mealPlan = document.querySelector('.project__meal-plan');
const trainingLog = document.querySelector('.project__training-log');

const projects = [mealPlan, trainingLog];
const listeners = {};

const REM = () =>
  parseFloat(getComputedStyle(document.documentElement).fontSize);
const MIN_WIDTH = 180;
const SCREENSHOT_HEIGHT = 290;
const MIN_HEIGHT = () => SCREENSHOT_HEIGHT + 3 * REM();

projects.forEach(project => {
  listeners[`expand_${project.id}`] = expand(project);
  listeners[`collapse_${project.id}`] = collapse(project);
  project.addEventListener('click', listeners[`expand_${project.id}`]);
});

function expand(project) {
  return function expand() {
    project.removeEventListener('click', expand);
    backButton.addEventListener('click', listeners[`collapse_${project.id}`]);
    project.style.cursor = 'default';
    // project.style.top = getComputedStyle(project).top;
    // project.style.left = getComputedStyle(project).left;
    // console.log(getComputedStyle(project))

    const { width, height } = recentWork.getBoundingClientRect();
    const arr1 = [0, 0, MIN_WIDTH, 0, MIN_WIDTH, MIN_HEIGHT(), 0, MIN_HEIGHT()];
    const arr2 = [0, 0, width, 0, width, height, 0, height];
    const t1 = new TimelineMax();

    // project moves into upper left
    t1.to(project, 0.5, { top: 0, left: 0, width: '100%', height: '100%' });

    // other project vanishes
    const other = project === mealPlan ? trainingLog : mealPlan;
    // t1.to(other, 0.5, { opacity: 0, width: 0 }, '-=0.5');
    t1.to(other, 0.2, { opacity: 0 }, '-=0.8');
    t1.to(other, 0.5, { width: 0 }, '-=0.5');

    // // clip-path reveals project
    // arr2.onUpdate = function () {
    //   TweenMax.set(
    //     project,
    //     {
    //       clipPath: `polygon(
    //       ${arr1[0]} ${arr1[1]},
    //       ${arr1[2]}px ${arr1[3]},
    //       ${arr1[4]}px ${arr1[5]}px,
    //       ${arr1[6]} ${arr1[7]}px
    //     )`
    //     }
    //   );
    // };

    // t1.to(arr1, 0.5, arr2, '-=0.2');

    // back button appears
    t1.to(backButton, 0.5, { opacity: 0.9, top: '1rem', right: '2rem' }, '-=0.5')
  }
}

function collapse(project) {
  return function collapse() {
    backButton.removeEventListener('click', collapse);
    project.addEventListener('click', listeners[`expand_${project.id}`]);
    project.style.cursor = 'zoom-in';

    const { width, height } = recentWork.getBoundingClientRect();
    const arr1 = [0, 0, width, 0, width, height, 0, height];
    const arr2 = [0, 0, MIN_WIDTH, 0, MIN_WIDTH, MIN_HEIGHT(), 0, MIN_HEIGHT()];
    const t = new TimelineMax();

    // back button disappears
    t.to(backButton, 0.5, { opacity: 0, top: 0, right: 0 });

    // other project reappears
    const other = project === mealPlan ? trainingLog : mealPlan;
    const colWidth = width / 2 - 2 * REM();
    t.to(
      other,
      0.5,
      {
        opacity: 1,
        // width: colWidth,
        width: MIN_WIDTH,
        // onComplete: () => other.style.width = ''
      },
      '-=0.5'
    );

    // // clip-path reveals project
    // arr2.onUpdate = function () {
    //   TweenMax.set(
    //     project,
    //     {
    //       clipPath: `polygon(
    //         ${arr1[0]} ${arr1[1]},
    //         ${arr1[2]}px ${arr1[3]},
    //         ${arr1[4]}px ${arr1[5]}px,
    //         ${arr1[6]} ${arr1[7]}px
    //       )`
    //     }
    //   );
    // };

    // t.to(arr1, 0.3, arr2, '-=0.5');

    // project moves back to column center
    const colHeight = height - 3 * REM();
    t.to(
      project,
      0.5,
      {
        // top: colHeight / 2 - MIN_HEIGHT() / 2 - 2 * REM(),
        // left: colWidth / 2 - MIN_WIDTH / 2,
        top: 'unset',
        left: 'unset',
        width: MIN_WIDTH,
        height: MIN_HEIGHT(),
        // onComplete: () => {
          // project.style.top = '';
          // project.style.left = '';
          // trainingLog.style.top = '';
          // trainingLog.style.left = '';
        // }
      },
      '-=0.5'
    );
  }
}

// window.addEventListener('resize', handleResize);
// window.addEventListener('load', handleResize);

// function handleResize() {
//   const colHeight = recentWork.getBoundingClientRect().height - 3 * REM();
//   const colWidth = recentWork.getBoundingClientRect().width / 2 - 2 * REM();
//   projects.forEach(project => {
//     project.style.top = `${colHeight / 2 - MIN_HEIGHT() / 2 - 2 * REM()}px`;
//     project.style.left = `${colWidth / 2 - MIN_WIDTH / 2}px`;
//   });
// }

// window.addEventListener('load', () => {
//   const colHeight = recentWork.getBoundingClientRect().height - 3 * REM();
//   const colWidth = recentWork.getBoundingClientRect().width / 2 - 2 * REM();

//   const init = new TimelineMax();
//   init.to(mealPlan, 0.3, { top: `${colHeight / 2 - MIN_HEIGHT() / 2 - 2 * REM()}px`, left: `${colWidth / 2 - MIN_WIDTH / 2}px` });
//   init.to(trainingLog, 0.3, { top: `${colHeight / 2 - MIN_HEIGHT() / 2 - 2 * REM()}px`, left: `${colWidth / 2 - MIN_WIDTH / 2}px` }, '-=0.3');
// });