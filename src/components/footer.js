import * as React from "react";
import { Link } from "gatsby";

import FooterBox from "../components/footer-box";
import Discord from "./socials/discord";
import Github from "./socials/github";
import Email from "./socials/email";
import Twitter from "./socials/twitter";
import Youtube from "./socials/youtube";

import { navigation } from "../datas/footer/navigation";

import addToMailchimp from "gatsby-plugin-mailchimp";

import ReactModal from "react-modal";

ReactModal.setAppElement("#___gatsby");


class Footer extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			email: "",
			listFields: {
				"group[57543]": "1",
			},
			isModalOpen: false,
			popupTitle: "",
			msg: "",
		};
	}
	handleModalOpen = (event) => {
		this.setState({ isModalOpen: true });
		document.body.style.overflow = "hidden";
	};

	handleModalClose = (event) => {
		this.setState({ isModalOpen: false });
		document.body.style.overflow = "unset";
	};

	mailchimp(url) {
		addToMailchimp(this.state.email, this.state.listFields, url) // listFields are optional if you are only capturing the email address.
			.then((data) => {
				this.setState({ msg: data.msg });
				if (data.result === "error" && data.msg.includes("is already subscribed")) {
					this.setState({ success: true });
					this.setState({ isModalOpen: true });
					this.setState({ popupTitle: "Thank you!" });
					this.setState({ msg: "Thank you for subscribing!" });
				} else {
					if (data.result === "success") {
						this.setState({ success: true });
						this.setState({ isModalOpen: true });
						this.setState({ popupTitle: "Thank you!" });
						this.setState({ msg: this.state.msg });
					} else {
						this.setState({ isModalOpen: true });
						this.setState({ popupTitle: "Error" });
					}
				}
				//console.log(data)
			})
			.catch(() => {});
	}

	_handleSubmit = (e) => {
		e.preventDefault();
		const listFields = {};

		listFields["group[57543][1]"] = 1;

		this.setState(
			(prevState) => ({
				listFields,
			}),
			() => {
				if (this.state.email) {
					this.mailchimp("https://celestia.us6.list-manage.com/subscribe/post?u=cde2461ba84f5279fff352829&amp;id=8d165e36d3");
				}
			}
		);
	};

	change = (e) => {
		e.preventDefault();
		this.setState({ email: e.target.value });
	};

	render() {
		return (
			<footer id={"footer"}>
				<div className={"container"}>
					<FooterBox footerBoxes={this.props.FooterBoxes} />

					<div className={"row py-5 mt-5"}>
						<div className={"col col-12 col-lg-4 col-xl-5 pe-5"}>
							<div className={"title"}>Subscribe to our Newsletter</div>

							<form onSubmit={(e) => this._handleSubmit(e)} className={"needs-validation"}>
								<input type='email' id={"email"} className={"form-control"} onChange={(e) => this.change(e)} required placeholder="mail@celestia.com" />
								<button type={"submit"} className={"button button-simple mt-3"}>
									Subscribe
								</button>
							</form>

							<div className={"socials"}>
								<Discord url={"https://discord.com/invite/YsnTPcSfWQ"} />
								<Github url={"https://github.com/celestiaorg"} />
								<Email url={"https://t.me/CelestiaCommunity"} />
								<Twitter url={"https://twitter.com/CelestiaOrg"} />
								<Youtube url={"https://www.youtube.com/channel/UCLlvAEzXBFZ-P3zS6BF2Bjg"} />
							</div>
						</div>
						<div className={"col col-12 col-lg-8 col-xl-7 ps-3 pt-5 pt-lg-0 ps-lg-5"}>
							<div className={"row"}>
								<div className={"col col-12 col-sm-3 col-lg-3"}>
									<div className={"col-title"}>Sitemap</div>
									<nav>
										<ul>
											{navigation.col1.links.map((link) => (
												<li key={`${link.url}`}>
													{link.type === "external" ? (
														<a href={`${link.url}`} target={"_blank"} rel={"noreferrer"}>
															{link.text}
														</a>
													) : (
														<Link to={`${link.url}`}>{link.text}</Link>
													)}
												</li>
											))}
										</ul>
									</nav>
								</div>
								<div className={"col col-12 col-sm-5 col-lg-5 align-right pt-5 pt-sm-0"}>
									<div className={"col-title text-right"}>{navigation.col2.label}</div>
									<nav>
										<ul>
											{navigation.col2.links.map((link) => (
												<li key={`${link.url}`}>
													{link.type === "external" ? (
														<a href={`${link.url}`} target={"_blank"} rel={"noreferrer"}>
															{link.text}
														</a>
													) : (
														<Link to={`${link.url}`}>{link.text}</Link>
													)}
												</li>
											))}
										</ul>
									</nav>
								</div>
								<div className={"col col-12 col-sm-4 col-lg-4 align-right pt-5 pt-sm-0"}>
									<div className={"col-title text-right"}>{navigation.col3.label}</div>
									<nav>
										<ul>
											{navigation.col3.links.map((link) => (
												<li key={`${link.url}`}>
													{link.type === "external" ? (
														<a href={`${link.url}`} target={"_blank"} rel={"noreferrer"}>
															{link.text}
														</a>
													) : (
														<Link to={`${link.url}`}>{link.text}</Link>
													)}
												</li>
											))}
										</ul>
									</nav>
								</div>
							</div>
						</div>
					</div>

					<div className={"row justify-content-center"}>
						<div className={"col col-12 col-sm-6"}>
							<p>This website is maintained by Celestia Labs, trading name of Strange Loop Labs AG, Werdenbergerweg 11, 9490 Vaduz, Liechtenstein.</p>
						</div>
					</div>

					<div className={"row justify-content-center"}>
						<div className={"col col-12 col-sm-6 text-center"}>
							<p className="copyright">
								Made with <i className={"icon-heart"} /> by <a href='https://designatives.com'>Designatives</a>
							</p>
						</div>
					</div>
				</div>
				<ReactModal isOpen={this.state.isModalOpen}>
					<div className={"inner"}>
						<h3 className={"text-center"}>{this.state.popupTitle}</h3>
						<div
							className={"text-center"}
							dangerouslySetInnerHTML={{
								__html: this.state.msg,
							}}
						/>
						<button className={"close-button"} onClick={this.handleModalClose}>
							<i className={"icon-close"} aria-label='Close'></i>
						</button>
					</div>
				</ReactModal>
			</footer>
		);
	}
}

export default Footer;
