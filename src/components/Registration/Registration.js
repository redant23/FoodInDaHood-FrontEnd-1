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
          name: "",
          price: "",
          description: "",
          img_url: "",
          is_main_menu: false
        }
      ],
      menuForm: [1],
      menuCategoryData: ["핫도그", "빈대떡", "무파마", "라면", "햄버거", "피자"],
      selectedCategoryData: []
    };
  }

  handleAddClick(ev) {
    ev.preventDefault();
    if (this.state.menuForm.length < 3) {
      this.state.menuForm.push(1);
      this.state.menu.push({
        name: "",
        price: "",
        description: "",
        img_url: "",
        is_main_menu: false
      });
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
    let updatingState = { ...this.state };
    if (ev.target.name === "menu-name") {
      updatingState.menu[menuNumber].name = ev.target.value;
      this.setState({ ...updatingState });
    } else if (ev.target.name === "menu-price") {
      updatingState.menu[menuNumber].price = ev.target.value;
      this.setState({ ...updatingState });
    } else if (ev.target.name === "menu-description") {
      updatingState.menu[menuNumber].description = ev.target.value;
      this.setState({ ...updatingState });
    } else if (ev.target.name === "menu-photo") {
      updatingState.menu[menuNumber].img_url = ev.target.files[0];
      this.setState({ ...updatingState });
    } else if (ev.target.name === "menu-main") {
      updatingState.menu[menuNumber].is_main_menu = !updatingState.menu[
        menuNumber
      ].is_main_menu;
      this.setState({ ...updatingState });
    }
  }

  handleCheckboxChange(ev) {
    console.log(ev.target);
  }

  handleMenuCategoryClick(ev) {
    let item = ev.target.innerHTML;
    let updatingState = { ...this.state };

    if (!updatingState.selectedCategoryData.includes(item)) {
      updatingState.selectedCategoryData.push(item);
      this.setState({ ...updatingState });
    }
  }

  handleFoodCategoryChange(ev) {
    let updatingState = { ...this.state };
    if (ev.target.name === "foodCategory1") {
      updatingState.foodCategory[0] = ev.target.value;
      this.setState(updatingState);
    } else if (ev.target.name === "foodCategory2") {
      updatingState.foodCategory[1] = ev.target.value;
      this.setState(updatingState);
    } else if (ev.target.name === "foodCategory3") {
      updatingState.foodCategory[2] = ev.target.value;
      this.setState(updatingState);
    }
  }

  handleSubmit(ev) {
    ev.preventDefault();
    console.log(this.state);
    this.props._vendorRegistrationRequest(this.state);
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
                type="number"
                value={this.state.lat}
                onChange={this.handleLatChange.bind(this)}
              />
            </label>
          </div>
          <div>
            <label htmlFor="">
              <span className="label-name">경도</span>
              <input
                type="number"
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
            <h1>카테고리 3개를 입력해 주세요.</h1>
            <label htmlFor="">
              <span className="label-name">음식 카테고리1</span>
              <input
                type="text"
                name="foodCategory1"
                onChange={this.handleFoodCategoryChange.bind(this)}
              />
            </label>
            <label htmlFor="">
              <span className="label-name">음식 카테고리2</span>
              <input
                type="text"
                name="foodCategory2"
                onChange={this.handleFoodCategoryChange.bind(this)}
              />
            </label>
            <label htmlFor="">
              <span className="label-name">음식 카테고리3</span>
              <input
                type="text"
                name="foodCategory3"
                onChange={this.handleFoodCategoryChange.bind(this)}
              />
            </label>
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
                    <input
                      className="isMainMenuInput"
                      type="checkbox"
                      name="menu-main"
                    />
                  </label>
                </div>
              </div>
            ))}
          </div>
          <div>
            <button onClick={this.handleAddClick.bind(this)}>추가</button>
            <button onClick={this.handleRemoveClick.bind(this)}>삭제</button>
          </div>
          <input type="submit" value="완료" />
        </form>
      </div>
    );
  }
}

export default Registration;
