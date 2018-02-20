import React, {Component} from 'react'

class SingleMemePage extends Component {

  render() {
    const exampleData = {
      _id: "5a837c342e0c281450425cf0",
      title: "Raise a glass for the man in the room",
      url: "/images/memes/1015659325615994758942.jpg",
      uploaded_by: "10156593256159947",
      favorites: [
        "10156593256159947",
        "10157285303858508"
      ],
      characters: [
        "charlie",
        "frank"
      ],
      numFaves: 2
    }

    return(
      <div>
        Use this to design the single meme page.
        Title: {exampleData.title}

      </div>
    )
  }
}

export default SingleMemePage