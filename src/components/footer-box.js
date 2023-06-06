import * as React from "react"
import Discord from "./socials/discord";
import Github from "./socials/github";
import Email from "./socials/email";
import Twitter from "./socials/twitter";
import Button from "./buttons/button";
import ReactModal from "react-modal";
import SignUp from "./modals/signUp";

class FooterBox extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isModalOpen: false,
        };
    }

    handleModalOpen = event => {
        this.setState({ modalType: event.target.id })
        this.setState({ isModalOpen: true })
        document.body.style.overflow = 'hidden';
    }

    handleModalClose = event => {
        this.setState({ isModalOpen: false })
        document.body.style.overflow = 'unset';
    }
    render() {
        return (
            <div className={'footer-boxes'}>
                { this.props.footerBoxes && this.props.footerBoxes.map((box,index)=>{
                    return <div key={index} className={'footer-box'}>
                        <div className={'footer-box-inner'}>
                            <div className={'bg'}/>
                            <div className={'inner'}>
                                <div className={'title'}>{box.title}</div>
                                <div className={'footer-box-inner-bottom'}>
                                    {box.button &&  box.button.type === 'modal' ? <div className={'button button-simple'} role={'button'} onClick={this.handleModalOpen} tabIndex={0} onKeyDown={this.handleModalOpen} id={box.button.id}>{box.button.text}</div> : <Button class={'simple'} id={box.button.id} type={'internal'} url={box.button.href} text={box.button.text}/>}
                                    {box.socials && <div className={'socials'}>
                                        {box.socials.discord && <Discord url={box.socials.discord} />}
                                        {box.socials.github && <Github url={box.socials.github} />}
                                        {box.socials.email && <Email url={box.socials.email} />}
                                        {box.socials.twitter && <Twitter url={box.socials.twitter} />}
                                    </div>}
                                </div>
                            </div>
                        </div>
                    </div>
                })}
                <div className={'clear'}/>

                <ReactModal
                    isOpen={this.state.isModalOpen}
                >
                    <div className={'inner'}>
                        <SignUp modalType={this.state.modalType}/>
                        <button className={'close-button'} onClick={this.handleModalClose} onKeyDown={this.handleModalClose}><i className={'icon-close'} aria-label="Close"></i></button>
                    </div>
                </ReactModal>
            </div>
        );
    }
}


export default FooterBox
