import { number } from 'prop-types'


const Logo = (props) => (
  <div className="logo">
    <img src="/static/img/logo.svg" width={props.width} height={props.height} alt="❤️🐔" />

    <style jsx>{`
    `}</style>
  </div>
)


Logo.propTypes = {
  width: number,
  height: number,
}


Logo.defaultProps = {
  width: 50,
  height: 50,
}

export default Logo
