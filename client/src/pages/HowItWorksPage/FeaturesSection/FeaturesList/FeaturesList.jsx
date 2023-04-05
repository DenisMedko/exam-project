import classNames from 'classnames';
import style from './FeaturesList.module.sass';

const FeaturesList = ({ features }) => {
  return (
    <div className={style.list}>
      {features.map((feature, num, arr) => (
        <div className={style.features} key={feature.id}>
          <div
            className={classNames(style.verticalLine, {
              [style.firstVerticalLine]: num === 0,
              [style.lastVerticalLine]: num === arr.length - 1,
            })}
          ></div>
          <div className={style.horizontalLine}></div>

          <div className={style.feature}>
            <div className={style.num}>{`${num + 1}.`}</div>
            <p className={style.text}>{feature.text}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FeaturesList;
