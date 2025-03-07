import React, { useRef } from "react";
import "./products.css";

const whatsNewData = [
  {
    image: "/bl1.jpg",
    title: "Get Taj vouchers worth INR 15,000*",
    description: "Redeem the vouchers* on credit/debit card or UPI spends with Priority Banking. *T&C apply",
  },
  {
    image: "/elon.jpg",
    title: "Mutual Fund investing with SC Invest",
    description: "Get access to top performing funds, market insights, pre-generated SIP packs and more!",
  },
  {
    image: "/elon1.jpg",
    title: "USD deposit at 5%* p.a. NRI Priority Banking",
    description: "Invest in FCNR deposit. *T&C apply. Interest rates are subject to change. Tenure: 376 - 394 days",
  },
  {
    image: "/quote_2.jpg",
    title: "Business Instalment Loan",
    description: "Get Collateral free loan up to Rs. 100 lakhs with flexible loan tenure",
  },
  {
    image: "/Apple-Logo.png",
    title: "Deposits - Interest Rates",
    description: "Get up to 7.50% p.a.* interest on Fixed Deposits. *T&C apply",
  }
];

const Products = () => {
  const scrollRef = useRef(null);

  const scrollLeft = () => {
    scrollRef.current.scrollBy({ left: -300, behavior: "smooth" });
  };

  const scrollRight = () => {
    scrollRef.current.scrollBy({ left: 300, behavior: "smooth" });
  };

  return (
    <div className="products-section">
      <div className="products-wrapper-container">
        <h1 className="products-heading">Your Products</h1>
        <div className="products-container">
          <button className="scroll-button left" onClick={scrollLeft}>&#10094;</button>
          <div className="products-wrapper" ref={scrollRef}>
            {whatsNewData.map((item, index) => (
              <div className="product-card" key={index}>
                <img src={item.image} alt={item.title} className="product-image" />
                <div className="product-content">
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                  <a href="#" className="read-more">Read More →</a>
                </div>
              </div>
            ))}
          </div>
          <button className="scroll-button right" onClick={scrollRight}>&#10095;</button>
        </div>
      </div>
    </div>
  );
  
};

export default Products;
