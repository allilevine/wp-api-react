import DataStore from 'flux/stores/DataStore.js';
import AvatarImage from 'images/allison-avatar1.jpg';
import { HashLink as Link } from 'react-router-hash-link';

class Avatar extends React.Component {
  render() {

    return (
      <img src={AvatarImage} className="avatar" alt="Allison Levine" />
    );
  }
}

class About extends React.Component {

  componentDidMount() {
    
    // get about page content from WP
    let pageData = DataStore.getPageBySlug('about');
    let pageContent = pageData.content.rendered;
    // get about divs
    const aboutText = document.querySelector('.AboutText');
    const aboutRight = document.querySelector('.AboutRight');

    // reusable function replace about div text
    function replaceText(element, text) {
      element.innerHTML =`<div><p>${text}</p></div>`;
    }

    // after 2 seconds replace ... with initial message
    setTimeout(() => {
      replaceText(aboutText, 'Hi there!');
    }, 2000)

    // create a second chat div
    const aboutText2 = document.createElement('div');
    aboutText2.classList.add('childDiv');

    // after 2.5 seconds add chat div and fill it with ... to show typing
    setTimeout(() => {
      replaceText(aboutText2, '...');
      aboutRight.appendChild(aboutText2);
    }, 2500)

    // after 4 seconds show about page content
    setTimeout(() => {
      replaceText(aboutText2, pageContent);
    }, 4000)

    // get the view my work button
    const workButton = document.querySelector('.work-button');

    // after 5.5 seconds add the view my work button and display it
    setTimeout(() => {
      aboutRight.appendChild(workButton);
      workButton.style.display = 'inline-block';
    }, 5500)

  }


    render() {

        return (
            <div className="page about">
              <div className="content-wrap">
                <Avatar />
                <div className="AboutRight">
                  <div className="AboutText childDiv"><div><p>...</p></div></div>
                  <Link to="#work" className="work-button"><button>View My Work</button></Link>
                </div>
              </div>          
            </div>
        );
    }
}

export default About;
