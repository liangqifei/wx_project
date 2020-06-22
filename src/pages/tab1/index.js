import React from "react";
import "./index.scss";
import { NavBar, Icon, Badge, Modal, Toast, Card, List } from "antd-mobile";
import { withRouter } from "react-router-dom";
import { post, FileUrl } from "../../service/axios";
import nav_0 from "../../img/tab1/nav_0.png";
import nav_1 from "../../img/tab1/nav_1.png";
import nav_2 from "../../img/tab1/nav_2.png";
import nav_3 from "../../img/tab1/nav_3.png";
import nav_4 from "../../img/tab1/nav_4.png";
import { getLocal } from "../../utils/utils";
import { connect } from "react-redux";
import OrderListActions from "../../redux/orderlist/actions";
import ZHANDIAN_ACTION from "../../redux/zd_detail/actions";
let map = null;
@connect(
  () => {
    return {};
  },
  {
    updateNavType: OrderListActions.updateNavType,
    updateNavName: ZHANDIAN_ACTION.updateNavName,
  }
)
@withRouter
class Test extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      homedata: [
        {
          name: "站点",
          color: "#1088FF",
          num: "0",
          id: "zhandian",
        },
        {
          name: "在线设备",
          color: "#FE8D00",
          num: "0",
        },
        {
          name: "报警数",
          color: "#FE8D00",
          num: "0",
          id: "baojing",
        },
        {
          name: "待办工单",
          color: "#1088FF",
          num: "0",
          id: "workorder",
        },
        {
          name: "线上巡检",
          color: "#02C66F",
          num: "0",
        },
        {
          name: "线下巡检",
          color: "#1088FF",
          num: "0",
        },
      ],
      navdata: [
        {
          name: "工单服务",
          img: nav_0,
          pathname: "#/workorder",
          id: "workorder",
        },
        {
          name: "线上巡检",
          img: nav_1,
        },
        {
          name: "线下巡检",
          img: nav_2,
        },
        {
          name: "系统公告",
          pathname: "#/gonggao",
          img: nav_3,
          id: "gonggao",
        },
        {
          name: "知识库",
          img: nav_4,
          // id: 'zsk'
        },
      ],
      cvmSiteList: [],
      showoptions: {},
    };
  }
  router(type, id, name) {
    if (type == "2" && !id) {
      Toast.info("该功能正在开发中");
      return false;
    } else {
      if (!id) {
        return false;
      }
    }
    if (name == "待办工单") {
      this.props.updateNavType({ navPage: 0 });
    } else if (name == "工单服务") {
      this.props.updateNavType({ navPage: 1 });
    }
    this.props.history.push({ pathname: id });
  }
  getMapInfoDetail(id) {
    const { showoptions } = this.state;
    let mapDataDetail = post("/big/baiduSiteShow", { id });
    mapDataDetail.then(
      (res) => {
        showoptions.name = res.cvmsi.name;
        showoptions.cvmMonitorList = res.cvmsi.cvmMonitorList
          ? res.cvmsi.cvmMonitorList
          : [];
        this.setState({
          showoptions,
        });
      },
      (err) => {}
    );
  }
  getMapData() {
    let mapDataList = post("/big/baiduSite");
    let _this = this;
    mapDataList.then((res) => {
      map = new AMap.Map("map", {
        resizeEnable: true,
      });
      // 116.735373, "lat": 39.615295
      map.setZoomAndCenter("10", [116.735373, 39.615295]);
      let arr = [];
      res.cvmSiteList &&
        res.cvmSiteList.map((item) => {
          let pointdata = item.latitude.split(",");
          if (pointdata[0] && pointdata[1]) {
            AMap.convertFrom(pointdata, "baidu", function (status, result) {
              if (result.info === "ok") {
                let point = new AMap.Marker({
                  map: map,
                  icon: FileUrl + item.logoUrl,
                  //                 icon: new AMap.Icon({
                  //                   image: FileUrl + item.logoUrl,
                  //                   size: new AMap.Size(30),  //图标大小
                  //                   imageSize: new AMap.Size(20)
                  //                 }),

                  position: [result.locations[0].lng, result.locations[0].lat],
                });
                point.on("click", function (e) {
                  _this.getMapInfoDetail(item.id);
                });
                arr.push(point);
              }
            });
          }
        });
    });
  }
  getHomeData() {
    let homedataNum = post("/big/tjCount");

    homedataNum.then(
      (res) => {
        this.setState({
          homedata: [
            {
              name: "站点",
              color: "#1088FF",
              num: res ? res.siteCount : 0,
              id: "zhandian",
            },
            {
              name: "在线设备",
              color: "#FE8D00",
              num: res ? res.zxCount : 0,
            },
            {
              name: "报警数",
              color: "#FE8D00",
              num: res ? res.bjCount : 0,
              id: "baojing",
            },
            {
              name: "待办工单",
              color: "#1088FF",
              id: "workorder",
              num: res ? res.dbCount : 0,
            },
            {
              name: "线上巡检",
              color: "#02C66F",
              num: res ? res.xsPattolCount : 0,
            },
            {
              name: "线下巡检",
              color: "#1088FF",
              num: res ? res.xxPattolCount : 0,
            },
          ],
        });
      },
      (err) => {
        console.log(err);
      }
    );
  }
  componentDidMount() {
    Modal.alert(this.props.name);
    const token = getLocal("logintoken");
    if (!token) {
      this.router("#/login", "login");
    } else {
      this.getHomeData();
      this.getMapData();
    }
  }
  componentDidMount() {
    if (document) {
      console.log("skkdkk");
      document.title = "首页";
    }
  }
  render() {
    const { homedata, navdata, showoptions } = this.state;
    return (
      <div className="appView">
        <div className="appTitle">
          <NavBar
            mode="light"
            // icon={<Icon type="left" />}
            // onLeftClick={() => {
            //     this.props.history.go(-1)
            // }}
            rightContent={
              <Badge dot>
                <i
                  className="iconfont icon-tixing"
                  style={{ fontSize: "20px" }}
                />
              </Badge>
            }
          >
            城市监测
          </NavBar>
        </div>
        <div className="appContent">
          <div className="tab_main">
            <div className="home_section">
              <div className="homedata">
                {homedata.map((item, index) => {
                  return (
                    <div className="eachdata" key={index}>
                      <div
                        className="databox"
                        onClick={() => {
                          this.router(1, item.id, item.name);
                        }}
                      >
                        {index % 3 == 1 && (
                          <div className="border border1"> </div>
                        )}
                        <div className="count" style={{ color: item.color }}>
                          {item.num}
                        </div>
                        <div className="name">{item.name}</div>
                        {index % 3 == 1 && (
                          <div className="border border2"> </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
            {this.props.name}
            <div className="home_nav">
              {navdata &&
                navdata.map((item, index) => {
                  return (
                    <div
                      className="nav_item"
                      key={index + "nav"}
                      onClick={() => {
                        this.router(2, item.id, item.name);
                      }}
                    >
                      <div className="nav_icon">
                        <img src={item.img} />
                      </div>
                      <div className="nav_name">{item.name}</div>
                    </div>
                  );
                })}
            </div>
            <div className="map" id="map"></div>
            {showoptions.name ? (
              <div className="mapInfo">
                <Card>
                  <Card.Header
                    title={
                      <div
                        onClick={() => {
                          this.props.updateNavName({
                            name: showoptions.name,
                            siteId: showoptions.id,
                            navPage: 0,
                          });
                          this.props.history.push({ pathname: "zddetail" });
                        }}
                      >
                        {showoptions.name}
                      </div>
                    }
                    extra={
                      <i
                        className="iconfont icon-guanbi"
                        onClick={() => {
                          this.setState({
                            showoptions: {},
                          });
                        }}
                      ></i>
                    }
                  />
                  {showoptions.cvmMonitorList.length > 0 && (
                    <Card.Body>
                      {showoptions.cvmMonitorList &&
                        showoptions.cvmMonitorList.map((item) => {
                          return (
                            <div style={{ lineHeight: "30px" }}>
                              <span>{`${item.deviceName}_${item.dataPointName}`}</span>{" "}
                              <span>{`${item.attstr05}(${item.unit})`}</span>
                            </div>
                          );
                        })}
                    </Card.Body>
                  )}
                </Card>
              </div>
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default Test;
