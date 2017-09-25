import DataStore from 'flux/stores/DataStore.js';
import About from 'components/About.js';
import Item from 'components/Item.js';
import Scroll from 'smooth-scroll';

class Body extends React.Component {
  
  componentDidMount() {
    // smooth scrolling
    let scroll = new Scroll('a[href*="#"]',{
		header: '[data-scroll-header]'
	  });
  }
  
  componentWillUnmount() {
    scroll = null;
  }

    render() {
      let allPages = DataStore.getAllPages();
      allPages = _.sortBy(allPages, [function(page) { return page.menu_order; }]); // Sort pages by order
      let i = 0;

        return (
            <div className="body-content">
                <About />
                <div id="work">
                {allPages.map((page) => {
                    if((page.slug != 'home') && (page.slug != 'contact') && (page.slug != 'about')){
                      i++;
                       return(
                          <div className="page page-item" key={page.id}>
                            <Item slug={page.slug} itemIndex={i} />
                          </div>
                        )
                   }
                })}
            </div>
          </div>
        );
    }
}

export default Body;
