import { Row, Col, Card, Button, InputNumber, Tooltip, Image } from 'antd'
import styles from "./card.less"
import { toAllData, fzAll, updatewd, updatesd, updategz } from "@/services/login"
import Chart from './component/chart'
import { useEffect, useState } from 'react'
import { EditOutlined, SyncOutlined } from '@ant-design/icons';
import wdImg from '@/../public/wd.png'
import gqImg from '@/../public/gq.png'
import sdImg from '@/../public/sd.png'
import zlImg from '@/../public/zl.png'

const MyCard = () => {
  const [wendus, setWendus] = useState([])
  const [shidus, setShidus] = useState([])
  const [guanzhaos, setGuanzhaos] = useState([])
  const [zhiliangs, setZhiliangs] = useState([])
  const [fWendu, setFwendu] = useState([])
  const [fShidu, setFShidu] = useState([])
  const [fGuanzhao, setFGuanzhao] = useState([])
  const [reload, setReload] = useState(false)

  const getAllData = async () => {
    const result = await toAllData()
    const { wendu, shidu, guanzhao, zhiliang } = result;
    setWendus([...wendu]);
    setShidus([...shidu])
    setGuanzhaos([...guanzhao]);
    setZhiliangs([...zhiliang])
  }

  const getAllFZ = async () => {
    const temp = await fzAll()
    setFwendu([temp?.wfazhigao, temp?.wfazhidi])
    setFShidu([temp?.sfazhigao, temp?.sfazhidi])
    setFGuanzhao([temp?.gfazhigao, temp?.gfazhidi])
  }

  const updateWD = async () => {
    const temp = await updatewd([...fWendu]);
    console.log("wd")
  }

  const updateSD = async () => {
    const temp = await updatesd([...fShidu]);
    console.log("sd")
  }

  const updateGZ = async () => {
    const temp = await updategz([...fGuanzhao]);
    console.log("gz")
  }

  const toreload = async () => {
    setReload(true)
    await getAllData();
    setTimeout(() => {
      setReload(false)
    }, 100)
  }

  useEffect(() => {
    getAllData()
      getAllFZ()
  }, [])



  return (
    <div className={styles.warp}>
      <div className={styles.absolute}>
        <Tooltip title="刷新数据">
          <Button shape={"circle"} onClick={toreload} type="primary" icon={<SyncOutlined spin={reload} />} />
        </Tooltip>
      </div>
      <Row gutter={[24, 24]} bordered={true} >
        <Col span={12}>
          <Card title={<div style={{ fontSize: "30px",display:"flex",alignItems:"center" }}>温度 <Image
            width={25}
            style={{marginLeft:"5px"}}
            preview={false}
            src={wdImg}
          /></div>} bordered={false}>
            <Chart data={wendus} />
            <div className={styles.incard}>
              <div>当前温度： {wendus.length > 0 ? wendus[wendus.length - 1].item : ""}℃</div>
              <div className={styles.fz}>
                <div>阈值：</div>
                <div style={{ marginRight: "5px" }} className={styles.upDown}>
                  <div style={{ marginBottom: "5px" }} ><InputNumber value={fWendu[0]} onChange={(value) => setFwendu([value, fWendu[1]])} /></div>
                  <div><InputNumber value={fWendu[1]} onChange={(value) => setFwendu([fWendu[0], value,])} /></div>
                </div>
                <Tooltip title="确认更改">
                  <Button type="primary" shape="circle" onClick={updateWD} icon={<EditOutlined />} />
                </Tooltip>
              </div>
            </div>
          </Card>
        </Col>
        <Col span={12}>
          <Card title={<span style={{ fontSize: "30px",display:"flex",alignItems:"center"  }}>光照<Image
            width={25}
            style={{marginLeft:"5px"}}
            preview={false}
            src={gqImg}
          /></span>} bordered={false}>
            <Chart data={guanzhaos} />
            <div className={styles.incard}>
              <div>当前光照： {guanzhaos.length > 0 ? guanzhaos[guanzhaos.length - 1].item : ""}Lx</div>
              <div className={styles.fz}>
                <div>阈值：</div>
                <div style={{ marginRight: "5px" }} className={styles.upDown}>
                  <div style={{ marginBottom: "5px" }} ><InputNumber value={fGuanzhao[0]} onChange={(value) => setFGuanzhao([value, fGuanzhao[1]])} /></div>
                  <div><InputNumber value={fGuanzhao[1]} onChange={(value) => setFGuanzhao([fGuanzhao[0], value])} /></div>
                </div>
                <Tooltip title="确认更改">
                  <Button type="primary" shape="circle" onClick={updateGZ} icon={<EditOutlined />} />
                </Tooltip>
              </div>
            </div>
          </Card>
        </Col>
        <Col span={12}>
          <Card title={<span style={{ fontSize: "30px",display:"flex",alignItems:"center"  }}>湿度<Image
            width={25}
            style={{marginLeft:"5px"}}
            preview={false}
            src={sdImg}
          /></span>} bordered={false}>
            <Chart data={shidus} />
            <div className={styles.incard}>
              <div>当前湿度： {shidus.length > 0 ? shidus[shidus.length - 1].item : ""}%</div>
              <div className={styles.fz}>
                <div>阈值：</div>
                <div style={{ marginRight: "5px" }} className={styles.upDown}>
                  <div style={{ marginBottom: "5px" }} ><InputNumber value={fShidu[0]} onChange={(value) => setFShidu([value, fShidu[1]])} /></div>
                  <div><InputNumber value={fShidu[1]} onChange={(value) => setFShidu([fShidu[0], value])} /></div>
                </div>
                <Tooltip title="确认更改">
                  <Button type="primary" shape="circle" onClick={updateSD} icon={<EditOutlined />} />
                </Tooltip>
              </div>
            </div>
          </Card>
        </Col>
        <Col span={12}>
          <Card title={<span style={{ fontSize: "30px",display:"flex",alignItems:"center"  }}>空气质量<Image
            width={25}
            style={{marginLeft:"5px"}}
            preview={false}
            src={zlImg}
          /></span>} bordered={false}>
            <Chart data={zhiliangs} />
            <div className={styles.incard}>
              <div>当前空气质量： {zhiliangs.length > 0 ? zhiliangs[zhiliangs.length - 1].item : ""}</div>
            </div>
          </Card>
        </Col>
      </Row>
    </div>
  )
}

export default MyCard;