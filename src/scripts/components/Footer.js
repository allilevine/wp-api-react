import {Link} from 'react-router-dom';

class Footer extends React.Component {

    render() {
        return (
          <footer>
            <ul>
              <li>Find me on:</li>
              <li><a href="https://github.com/allilevine">Github</a></li>
              <li><a href="https://twitter.com/allilevine">Twitter</a></li>
              <li><a href="https://medium.com/@allilevine">Medium</a></li>
              <li><a href="https://profiles.wordpress.org/firewatch">WordPress.org</a></li>
            </ul>
          </footer>
        )
      }
    }

export default Footer;
