﻿import React, {Component} from 'react';
import classNames from 'classnames';
import Search from '../../../components/Search';
import styles from './index.scss';
import fontStyles from '../../../fonts/font-awesome.scss';

export default class Nearby extends Component{

    static contextTypes = {
        router: React.PropTypes.object
    }

    constructor(props){
        super(props);
        this.state = {};
    }

    onItemClick(keyword){
        const path = `/nearby/result?keyword=${keyword}`;
        this.context.router.push(path);
    }

    render(){
        const structure = [
            [
                [{
                    type: "big",
                    value: "美食畅饮",
                    className: styles.food,
                    fontIcon: classNames(fontStyles.fa, fontStyles["fa-cutlery"]),
                    height: 2 / 3
                }, "甜点饮品"],
                [
                    "快餐", "火锅", "茶餐厅"
                ],
                [
                    "中餐", "川菜", "西餐"
                ]
            ],
            [
                [{
                    type: "big",
                    value: "酒店住宿",
                    className: styles.hotel,
                    fontIcon: classNames(fontStyles.fa, fontStyles["fa-bed"]),
                    height: 1
                }],
                [
                    "快捷酒店", "星级酒店"
                ],
                [
                    "旅馆", "青年旅社"
                ]
            ],
            [
                [{
                    type: "big",
                    value: "娱乐休闲",
                    className: styles.recreation,
                    fontIcon: classNames(fontStyles.fa, fontStyles["fa-glass"]),
                    height: 2 / 3,
                }, "酒吧"],
                [
                    "电影院", "景点", "KTV"
                ],
                [
                    "网吧", "购物", "洗浴足疗"
                ]
            ],
            [
                [{
                    type: "big",
                    value: "交通出行",
                    className: styles.traffic,
                    fontIcon: classNames(fontStyles.fa, fontStyles["fa-bus"]),
                    height: 1
                }],
                [
                    "加油站", "地铁站"
                ],
                [
                    "公交站", "停车场"
                ]
            ],
            [
                [{
                    type: "big",
                    value: "生活服务",
                    className: styles.life,
                    fontIcon: classNames(fontStyles.fa, fontStyles["fa-shopping-cart"]),
                    height: 2 / 3
                }, "美容美发"],
                [
                    "ATM", "公厕", "药店"
                ],
                [
                    "银行", "超市", "医院"
                ]
            ]
        ];
        return (
            <div className={styles.root}>
                <Search placeholder="搜索附近地点" />
                <div className={styles.cards}>
                    {
                        structure.map((card, index) => {
                            return (
                                <div className={styles.card} key={`card-${index}`}>
                                    {
                                        card.map((column, index) => {
                                            return (
                                                <div className={styles.column} key={`column-${index}`}>
                                                    {
                                                        column.map((item, index) => {
                                                            if(item.type === 'big'){
                                                                return (
                                                                    <div className={classNames(styles["big-item"], item.className)} onClick={()=>{this.onItemClick(item.value)}} key={`item-${index}`} style={{height: `${item.height*100}%`}}>
                                                                        <i className={classNames(styles.icon, item.fontIcon)}></i>
                                                                        <div className={styles.label}>{item.value}</div>
                                                                    </div>
                                                                );
                                                            }else{
                                                                return <div className={styles["small-item"]} onClick={()=>{this.onItemClick(item)}} key={`item-${item}`}>{item}</div>;
                                                            }
                                                        })
                                                    }
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        );
    }
};