import React from "react";
import styled from "styled-components";

import "./_footer.scss";

const Holder = styled.div`
    max-width: 160rem;
    margin: 0 auto;
`;

export default function Footer() {
    return (
        <footer className="footer">
            <Holder>
                <div className="footer__logobox">
                    <div className="footer__logo">{}</div>
                    <h1 className="footer__logo-heading">explodii</h1>
                </div>
                <div className="footer__content">
                    <div className="footer__navigation">
                        <a href="/" className="footer__btn">
                            About Us
                        </a>
                        <a href="/" className="footer__btn">
                            Careers
                        </a>
                        <a href="/" className="footer__btn">
                            Events
                        </a>
                        <a href="/" className="footer__btn">
                            Contact Us
                        </a>
                        <a href="/" className="footer__btn">
                            Privacy Policy
                        </a>
                        <a href="/" className="footer__btn">
                            Terms of Use
                        </a>
                    </div>
                    <div className="footer__copyright">
                        &copy; {new Date().getFullYear()} by{" "}
                        <a
                            href="/"
                            className="footer__btn"
                            style={{
                                textTransform: "none",
                            }}
                        >
                            Ilias Allek
                        </a>
                        . All rights reserved.
                    </div>
                    <div className="footer__media">
                        <a href="/" className="footer__media--1">
                            {}
                        </a>
                        <a href="/" className="footer__media--2">
                            {}
                        </a>
                        <a href="/" className="footer__media--3">
                            {}
                        </a>
                        <a href="/" className="footer__media--4">
                            {}
                        </a>
                        <a href="/" className="footer__media--5">
                            {}
                        </a>
                    </div>
                </div>
            </Holder>
        </footer>
    );
}
