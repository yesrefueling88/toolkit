import React, { useState } from 'react'
import { Text, View } from '@tarojs/components'
import { NavBar } from '@components'
import { unstable_batchedUpdates } from 'react-dom';//批量更新状态时使用
import { toast } from "@utils/index";
import './index.scss'


const Index: React.FC<any> = () => {
  const [firstValue, setFirstValue] = useState('');
  const [operatorFlag, setOperatorFlag] = useState('');
  const [secondValue, setSecondValue] = useState('');
  const [result, setResult] = useState('');
  const [isCalclated, setIsCalclated] = useState(false);
  const keys: string[][] = [
    ['平方', '清空', '退格', '/'],
    ['7', '8', '9', 'x'],
    ['4', '5', '6', '-'],
    ['1', '2', '3', '+'],
    ['0', '.', '√', '='],
  ];

  const reset = () => {
    setFirstValue('');
    setOperatorFlag('');
    setSecondValue('');
    setResult('');
    setIsCalclated(false);
  };

  const handClickKey = (currentKey: string) => {
    const nums = ['.', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
    const operator = ['+', '-', 'x', '/'];
    const func = ['平方', '清空', '退格', '√', '='];

    if (isCalclated && currentKey !== '清空') {
      if (['+', '-', 'x', '/', '平方', '√',].includes(currentKey)) {
        switch (currentKey) {
          case '+':
            unstable_batchedUpdates(() => {
              setIsCalclated(false);
              setFirstValue(result);
              setOperatorFlag(currentKey);
              setSecondValue('');
              setResult('');
            });
            break;
          case '-':
            unstable_batchedUpdates(() => {
              setIsCalclated(false);
              setFirstValue(result);
              setOperatorFlag(currentKey);
              setSecondValue('');
              setResult('');
            });
            break;
          case 'x':
            unstable_batchedUpdates(() => {
              setIsCalclated(false);
              setFirstValue(result);
              setOperatorFlag(currentKey);
              setSecondValue('');
              setResult('');
            });
            break;
          case '/':
            unstable_batchedUpdates(() => {
              setIsCalclated(false);
              setFirstValue(result);
              setOperatorFlag(currentKey);
              setSecondValue('');
              setResult('');
            });
            break;
          case '平方':
            unstable_batchedUpdates(() => {
              setFirstValue(result + '^2');
              setOperatorFlag('');
              setSecondValue('');
              setResult(String(Math.pow(parseFloat(result), 2)));
              setIsCalclated(true);
            });
            break;
          case '√':
            unstable_batchedUpdates(() => {
              setFirstValue('√' + result);
              setOperatorFlag('');
              setSecondValue('');
              setResult(String(Math.sqrt(parseFloat(result))));
              setIsCalclated(true);
            });
            break;
          default:
            break;
        }
        return
      }

      setTimeout(function () {
        unstable_batchedUpdates(() => {
          setIsCalclated(false);
          if (nums.includes(currentKey)) {
            setFirstValue(currentKey)
          } else {
            setFirstValue('');
            toast('请输入有效值');
          }
          setOperatorFlag('');
          setSecondValue('');
          setResult('');
        })
      }, 0);
      return;
    }

    if (nums.includes(currentKey)) {
      if (!!operatorFlag && !secondValue) {
        setSecondValue(currentKey)
      } else {
        if (!!secondValue) {
          setSecondValue(secondValue + currentKey)
        } else {
          setFirstValue(firstValue + currentKey)
        }
      }

      return
    }

    if (operator.includes(currentKey)) {
      !!firstValue ? setOperatorFlag(currentKey) : toast('请输入有效值');

      return
    }

    if (func.includes(currentKey)) {
      switch (currentKey) {
        case '=':
          switch (operatorFlag) {
            case '+':
              if (!secondValue) {
                toast('请输入有效值');
                return
              }

              setResult(String(parseFloat(firstValue) + parseFloat(secondValue)));
              setIsCalclated(true);
              break;
            case '-':
              if (!secondValue) {
                toast('请输入有效值');
                return
              }

              setResult(String(parseFloat(firstValue) - parseFloat(secondValue)));
              setIsCalclated(true);
              break;
            case 'x':
              if (!secondValue) {
                toast('请输入有效值');
                return
              }

              setResult(String(parseFloat(firstValue) * parseFloat(secondValue)));
              setIsCalclated(true);
              break;
            case '/':
              if (!secondValue) {
                toast('请输入有效值');
                return
              }

              setResult(String(parseFloat(firstValue) / parseFloat(secondValue)));
              setIsCalclated(true);
              break;
            default:
              break
          }
          break;
        case '√':
          if (!firstValue) {
            toast('请输入有效值');
            return
          }

          if (!!operatorFlag) {
            if (!!secondValue) {
              switch (operatorFlag) {
                case '+':
                  const res_add = String(parseFloat(firstValue) + parseFloat(secondValue));
                  setFirstValue('√' + res_add);
                  setOperatorFlag('');
                  setSecondValue('');
                  setResult(String(Math.sqrt(parseFloat(res_add))));
                  setIsCalclated(true);
                  break;
                case '-':
                  const res_minus = String(parseFloat(firstValue) - parseFloat(secondValue));
                  setFirstValue('√' + res_minus);
                  setOperatorFlag('');
                  setSecondValue('');
                  setResult(String(Math.sqrt(parseFloat(res_minus))));
                  setIsCalclated(true);
                  break;
                case 'x':
                  const res_multipli = String(parseFloat(firstValue) * parseFloat(secondValue));
                  setIsCalclated(true);
                  setFirstValue('√' + res_multipli);
                  setOperatorFlag('');
                  setSecondValue('');
                  setResult(String(Math.sqrt(parseFloat(res_multipli))));
                  setIsCalclated(true);
                  break;
                case '/':
                  const res_division = String(parseFloat(firstValue) / parseFloat(secondValue));
                  setIsCalclated(true);
                  setFirstValue('√' + res_division);
                  setOperatorFlag('');
                  setSecondValue('');
                  setResult(String(Math.sqrt(parseFloat(res_division))));
                  setIsCalclated(true);
                  break;
                default:
                  break
              }
            } else {
              setFirstValue('√' + firstValue);
              setOperatorFlag('');
              setResult(String(Math.sqrt(parseFloat(firstValue))));
              setIsCalclated(true);
            }
          } else {
            setFirstValue('√' + firstValue);
            setResult(String(Math.sqrt(parseFloat(firstValue))));
            setIsCalclated(true);
          }
          break;
        case '平方':
          if (!firstValue) {
            toast('请输入有效值');
            return
          }

          if (!!operatorFlag) {
            if (!!secondValue) {
              switch (operatorFlag) {
                case '+':
                  const res_add = String(parseFloat(firstValue) + parseFloat(secondValue));
                  setFirstValue(res_add + '^2');
                  setOperatorFlag('');
                  setSecondValue('');
                  setResult(String(Math.pow(parseFloat(res_add), 2)));
                  setIsCalclated(true);
                  break;
                case '-':
                  const res_minus = String(parseFloat(firstValue) - parseFloat(secondValue));
                  setFirstValue(res_minus + '^2');
                  setOperatorFlag('');
                  setSecondValue('');
                  setResult(String(Math.pow(parseFloat(res_minus), 2)));
                  setIsCalclated(true);
                  break;
                case 'x':
                  const res_multipli = String(parseFloat(firstValue) * parseFloat(secondValue));
                  setIsCalclated(true);
                  setFirstValue(res_multipli + '^2');
                  setOperatorFlag('');
                  setSecondValue('');
                  setResult(String(Math.pow(parseFloat(res_multipli), 2)));
                  setIsCalclated(true);
                  break;
                case '/':
                  const res_division = String(parseFloat(firstValue) / parseFloat(secondValue));
                  setIsCalclated(true);
                  setFirstValue(res_division + '^2');
                  setOperatorFlag('');
                  setSecondValue('');
                  setResult(String(Math.pow(parseFloat(res_division), 2)));
                  setIsCalclated(true);
                  break;
                default:
                  break
              }
            } else {
              setFirstValue(firstValue + '^2');
              setOperatorFlag('');
              setResult(String(Math.pow(parseFloat(firstValue), 2)));
              setIsCalclated(true);
            }
          } else {
            setFirstValue(firstValue + '^2');
            setResult(String(Math.pow(parseFloat(firstValue), 2)));
            setIsCalclated(true);
          }
          break;
        case '清空':
          reset();
          break;
        case '退格':
          if (!!secondValue) {
            setSecondValue(secondValue.substring(0, secondValue.length - 1));
            return
          }

          if (!!operatorFlag) {
            setOperatorFlag(operatorFlag.substring(0, operatorFlag.length - 1));
            return
          }

          if (!!firstValue) {
            setFirstValue(firstValue.substring(0, firstValue.length - 1));
            return
          }
          break;
        default:
          break
      }
      return
    }

  };

  return (
    <View className='calculator'>
      <NavBar
        title='计算器'
      />
      <View className='calculator__keyboard'>
        {!!firstValue && (
          <View className={!!result ? 'calculator__input-line' : 'calculator__result-line'}>
            <Text className={!!result ? 'calculator__input-line-text' : 'calculator__result-line-text'}>
              {
                !!operatorFlag
                  ? (!!secondValue ? `${firstValue} ${operatorFlag} ${secondValue}` : `${firstValue} ${operatorFlag}`)
                  : firstValue
              }
            </Text>
          </View>
        )}

        {!!result && (
          <View className='calculator__result-line'>
            <Text className='calculator__result-line-text'>{`= ${result}`}</Text>
          </View>
        )}

        <View className='calculator__keyboard-content'>
          {keys.map((item, index) => {
            return (
              <View key={index} className='calculator__keyboard-content-line'>
                {item.map((subItem, subIndex) => {
                  return (
                    <View
                      key={subIndex}
                      className='calculator__keyboard-content-line-item-wrap'
                      onClick={() => {
                        handClickKey(subItem)
                      }}
                    >
                      <View className='calculator__keyboard-content-line-item-wrap-detail'>
                        <Text className='calculator__keyboard-content-line-item-wrap-detail-text'>
                          {subItem}
                        </Text>
                      </View>
                    </View>
                  )
                })}
              </View>
            )
          })}
        </View>
      </View>
    </View>
  )
};

export default Index
