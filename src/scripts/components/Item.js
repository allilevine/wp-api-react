import DataStore from 'flux/stores/DataStore.js';
import LazyLoad from 'react-lazyload';

class Item extends React.Component {

    render() {
      let pageData = DataStore.getPageBySlug(this.props.slug);
      let imageURL = pageData.better_featured_image ?  pageData.better_featured_image.source_url : '';
      let displayClass;
      if (this.props.itemIndex % 2 != 0) {
        displayClass = 'content-inner';
      } else {
        displayClass = 'content-inner content-inner-reverse';
      }

        return (
            <div className="content-wrap">
              <div className={displayClass}>
                <div className="page-content">
                  <h3>{pageData.title.rendered}</h3>
                  <div dangerouslySetInnerHTML={{__html: pageData.content.rendered}} />
                </div>
                <div className="featuredImage">
                  <LazyLoad height={540} once > 
                    <img src={imageURL} alt={this.props.slug} />
                  </LazyLoad>
                </div>
            </div>
          </div>
        );
    }
}

export default Item;
