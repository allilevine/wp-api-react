import {Link} from 'react-router-dom';
import DataStore from 'flux/stores/DataStore.js';

class Header extends React.Component {
  componentDidMount() {
    const headerBar = document.querySelector('.header');
    let topOfNav = headerBar.offsetTop;

    function fixNav() {
      if(window.scrollY > topOfNav) {
        document.body.style.paddingTop = headerBar.offsetHeight + 'px';
        document.body.classList.add('fixed-header');
      } else {
        document.body.classList.remove('fixed-header');
        document.body.style.paddingTop = 0;
      }
    }

    window.addEventListener('scroll', fixNav);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', fixNav);
  }

    render() {
        let allPages = DataStore.getAllPages();
        allPages = _.sortBy(allPages, [function(page) { return page.menu_order; }]); // Sort pages by order

        return (
            <div className="header" data-scroll-header>
              <div className="header-wrap">
                <Link to="/"><h1>Allison Levine</h1></Link>
                <Link to="/contact"  className="contact-button">Get in Touch</Link>
              </div>
            </div>
        );
    }
}

export default Header;
