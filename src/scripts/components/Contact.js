import Recaptcha from 'react-recaptcha';
import Scroll from 'smooth-scroll';

class ContactForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      email: '',
      verified: false
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.callback = this.callback.bind(this);
    this.verifyCallback = this.verifyCallback.bind(this);
    
    // Listen for spoken message
    window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    this.recognition = new SpeechRecognition();
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }
  handleEmailChange(event) {
    this.setState({email: event.target.value});
  }
  
  // specifying your onload callback function
  callback() {
    console.log('Done!!!!');
  };

  // specifying verify callback function
  verifyCallback(response) {
    console.log(response);
  };

  handleSubmit(event) {
    event.preventDefault();
    
    let errors = [];
    const errorContainer = document.querySelector('.error-container');
    const submitButton = document.querySelector('input[type="submit"]');
    
    function validateEmail(email) {
      const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(email);
    }

    if(this.state.value && validateEmail(this.state.email)) {
      const params = {
        message: this.state.value,
        email: this.state.email
      };
      let formData = new FormData();

      for (var i in params) {
        formData.append(i, params[i]);
      }
      
      fetch('https://hooks.zapier.com/hooks/catch/1066206/r54b9w/', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: formData
      }).then(function(response) {
        if(response.ok) {
          errorContainer.innerHTML = '<p>Got it, thanks!</p>';
        }
      }).catch(function(error) {
        errors.push('There was a problem sending your message. Please try again.');
      });
    } else if (!this.state.value) {
        errors.push('Please type or speak your message.');
    } else if (validateEmail(this.state.email) === false) {
        errors.push('Please include a valid email address.');
    }
    
    errorContainer.innerHTML = `<p>${errors.join(' ')}</p>`;
    
  }

  componentDidMount() {
    var scrollToTop = new Scroll();
    scrollToTop.animateScroll( 0 );
    this.recognition.interimResults = true;
    
    const textarea = document.querySelector('textarea');
    textarea.oninput = function() {
      textarea.style.height = "";
      textarea.style.height = Math.min(textarea.scrollHeight) + "px";
    };

    this.recognition.addEventListener('result', e => {
      const transcript = Array.from(e.results)
        .map(result => result[0])
        .map(result => result.transcript)
        .join('');

        if (e.results[0].isFinal) {
          let spoken = `${this.state.value} ${transcript}`;
          this.setState({value: spoken});
          textarea.style.height = Math.min(textarea.scrollHeight) + "px";
        }
    });

    this.recognition.addEventListener('end', this.recognition.start);

    this.recognition.start();
  }
  
  componentWillUnmount() {
    this.recognition.removeEventListener('result', e => {
      const transcript = Array.from(e.results)
        .map(result => result[0])
        .map(result => result.transcript)
        .join('');

        if (e.results[0].isFinal) {
          let spoken = `${this.state.value} ${transcript}`;
          this.setState({value: spoken});
        }
    });
    this.recognition.removeEventListener('end', this.recognition.start);
    this.recognition.stop();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Type or speak your message (you may have to agree to let the site access your microphone).
          <textarea value={this.state.value} onChange={this.handleChange} autoFocus />
        </label>
        <label>
          How can I reach you?<br />
          <input type="email" value={this.state.email} onChange={this.handleEmailChange} />
        </label>
        <Recaptcha
            sitekey="6LfIGcISAAAAAKTGN9voVtjB_5Df5Cb9LMUG2_vc"
            render="explicit"
            verifyCallback={this.verifyCallback}
            onloadCallback={this.callback}
          />
        <div className="error-container"></div>
        <input type="submit" value="Send" />
      </form>
    );
  }
}

class Contact extends React.Component {
    render() {

        return (
            <div className="page contact">
              <div className="content-wrap">
                <h1>Tell me a little bit about who you are and how I can help.</h1>
                <ContactForm />
              </div>

            </div>
        );
    }
}

export default Contact;
