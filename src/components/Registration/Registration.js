import React, { Component } from "react";
import "./Registration.css";

class Registration extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: "",
      description: "",
      image: "",
      permissionNumber: "",
      address: "",
      lat: "",
      lng: "",
      phoneNumber: "",
      owner: "",
      openTime: "",
      closeTime: "",
      foodCategory: [],
      menu: [
        {
          menu: {
            menuName: "",
            menuPrice: "",
            menuDescription: "",
            menuPhoto: "",
            isMainMenu: false
          }
        }
      ],
      menuForm: [1]
    };
  }

  handleAddClick(ev) {
    ev.preventDefault();
    if (this.state.menuForm.length < 3) {
      this.state.menuForm.push(1);
      this.state.menu.push({ menu: {} });
    }

    this.setState({ ...this.state });
  }

  handleRemoveClick(ev) {
    ev.preventDefault();
    if (this.state.menuForm.length > 1) {
      this.state.menuForm.pop();
      this.state.menu.pop();
    }

    this.setState({ ...this.state });
  }

  handleTitleChange(ev) {
    let title = ev.target.value;
    this.setState({ title });
  }

  handleDescriptionChange(ev) {
    let description = ev.target.value;
    this.setState({ description });
  }

  handleImageChange(ev) {
    let image = ev.target.files[0];
    this.setState({ image });
  }

  handleRegistrationChange(ev) {
    let permissionNumber = ev.target.value;
    this.setState({ permissionNumber });
  }

  handleAddressChange(ev) {
    let address = ev.target.value;
    this.setState({ address });
  }

  handleLatChange(ev) {
    let lat = ev.target.value;
    this.setState({ lat });
  }

  handleLngChange(ev) {
    let lng = ev.target.value;
    this.setState({ lng });
  }

  handlePhoneNumberChange(ev) {
    let phoneNumber = ev.target.value;
    this.setState({ phoneNumber });
  }

  handleOwnerChange(ev) {
    let owner = ev.target.value;
    this.setState({ owner });
  }

  handleOpenTimeChange(ev) {
    let openTime = ev.target.value;
    this.setState({ openTime });
  }

  handleCloseTimeChange(ev) {
    let closeTime = ev.target.value;
    this.setState({ closeTime });
  }

  handleMenuFormChange(ev) {
    let menuNumber = Number(ev.currentTarget.dataset.id);
    if (ev.target.name === "menu-name") {
      this.state.menu[menuNumber].menu.menuName = ev.target.value;
      this.setState({ ...this.state });
    } else if (ev.target.name === "menu-price") {
      this.state.menu[menuNumber].menu.menuPrice = ev.target.value;
      this.setState({ ...this.state });
    } else if (ev.target.name === "menu-description") {
      this.state.menu[menuNumber].menu.menuDescription = ev.target.value;
      this.setState({ ...this.state });
    } else if (ev.target.name === "menu-photo") {
      this.state.menu[menuNumber].menu.menuPhoto = ev.target.files[0];
      this.setState({ ...this.state });
    } else if (ev.target.name === "menu-main") {
      this.state.menu[menuNumber].menu.isMainMenu = !this.state.menu[menuNumber]
        .menu.isMainMenu;
      this.setState({ ...this.state });
    }
  }

  handleCheckboxChange(ev) {
    console.log(ev.target);
  }

  handleMenuCategoryChange(ev) {
    console.log(ev.target);
  }

  handleSubmit(ev) {
    ev.preventDefault();
    console.log(this.state);
  }

  render() {
    return (
      <div className="registration-page">
        <div className="form-title">푸드트럭 등록</div>
        <form
          className="registration-form"
          onSubmit={this.handleSubmit.bind(this)}
        >
          <div>
            <label htmlFor="">
              <span className="label-name">트럭명</span>
              <input
                type="text"
                value={this.state.title}
                onChange={this.handleTitleChange.bind(this)}
              />
            </label>
          </div>
          <div>
            <label htmlFor="">
              <span className="label-name">트럭소개</span>
              <textarea
                type="text"
                value={this.state.description}
                onChange={this.handleDescriptionChange.bind(this)}
              />
            </label>
          </div>
          <div>
            <label htmlFor="">
              <span className="label-name">사진</span>
              <input
                type="file"
                name="pic"
                accept="image/*"
                onChange={this.handleImageChange.bind(this)}
              />
            </label>
          </div>
          <div>
            <label htmlFor="">
              <span className="label-name">등록번호</span>
              <input
                type="text"
                value={this.state.permissionNumber}
                onChange={this.handleRegistrationChange.bind(this)}
              />
            </label>
          </div>
          <div>
            <label htmlFor="">
              <span className="label-name">주소</span>
              <input
                type="text"
                value={this.state.address}
                onChange={this.handleAddressChange.bind(this)}
              />
            </label>
          </div>
          <div>
            <label htmlFor="">
              <span className="label-name">위도</span>
              <input
                type="text"
                value={this.state.lat}
                onChange={this.handleLatChange.bind(this)}
              />
            </label>
          </div>
          <div>
            <label htmlFor="">
              <span className="label-name">경도</span>
              <input
                type="text"
                value={this.state.lng}
                onChange={this.handleLngChange.bind(this)}
              />
            </label>
          </div>
          <div>
            <label htmlFor="">
              <span className="label-name">전화번호</span>
              <input
                type="text"
                value={this.state.phoneNumber}
                onChange={this.handlePhoneNumberChange.bind(this)}
              />
            </label>
          </div>
          <div>
            <label htmlFor="">
              <span className="label-name">대표이름</span>
              <input
                type="text"
                value={this.state.owner}
                onChange={this.handleOwnerChange.bind(this)}
              />
            </label>
          </div>
          <div>
            <label htmlFor="">
              <span className="label-name">오픈시간</span>
              <input
                type="time"
                value={this.state.openTime}
                onChange={this.handleOpenTimeChange.bind(this)}
              />
            </label>
          </div>
          <div>
            <label htmlFor="">
              <span className="label-name">마감시간</span>
              <input
                type="time"
                value={this.state.closeTime}
                onChange={this.handleCloseTimeChange.bind(this)}
              />
            </label>
          </div>
          <div className="menu-category-list">
            <span>
              <input
                value={this.state.foodCategory}
                foodCategoryonChange={this.handleMenuCategoryChange.bind(this)}
              />
            </span>
          </div>
          <div>
            {this.state.menuForm.map((item, index) => (
              <div
                className="menu-form"
                data-id={index}
                key={index}
                onChange={this.handleMenuFormChange.bind(this)}
              >
                <div>메뉴 {index + 1}</div>
                <div>
                  <label htmlFor="">
                    <span>메뉴이름</span>
                    <input name="menu-name" type="text" />
                  </label>
                </div>
                <div>
                  <label htmlFor="">
                    <span>가격</span>
                    <input name="menu-price" type="text" />
                  </label>
                </div>
                <div>
                  <label htmlFor="">
                    <span>메뉴설명</span>
                    <textarea name="menu-description" type="text" />
                  </label>
                </div>
                <div>
                  <label htmlFor="">
                    <span className="label-name">사진</span>
                    <input type="file" name="menu-photo" accept="image/*" />
                  </label>
                </div>
                <div>
                  <label htmlFor="">
                    <span className="label-name">메인메뉴</span>
                    <input type="checkbox" name="menu-main" />
                  </label>
                </div>
              </div>
            ))}
          </div>
          <div>
            <button onClick={this.handleAddClick.bind(this)}>추가</button>
            <button onClick={this.handleRemoveClick.bind(this)}>삭제</button>
          </div>
          <input type="submit" value="Submit" />
        </form>
      </div>
    );
  }
}

export default Registration;
