import "./InsideSplash.css"


const InsideSplash = ({page}) => {
    const imgs = [
        'https://i.imgur.com/Tm47KYl.jpeg',
        'https://i.imgur.com/ZDVgq1n.jpg'
    ]
    let img = ''
    if (page === 'projects'){
        img = imgs[0]
    } else {
        img = imgs[1]
    }
    return (
        <>
            <div className="project-splash">
                <img alt='' src={img}/>
            </div>
        </>
    )
}

export default InsideSplash
