export default function Entry(props) {
    return (
        <article className="journal-entry">
            <div className="main-img-container">
                <img className="main-img" src={props.entry.img.src} alt={props.entry.img.alt} />
            </div>
            <div>
                <div className="journal-top-container">
                    <img src="src/assets/marker.png" alt="map marker icon" />
                    <span>{props.entry.country}</span>
                    <a href={props.entry.map}>
                        View on Google Maps</a>
                </div>
                <h2 className="journal-place-title">{props.entry.title}</h2>
                <p className="journal-date">{props.entry.dates}</p>
                <p className="journal-description">{props.entry.text}</p>
            </div>
        </article>
    )
}