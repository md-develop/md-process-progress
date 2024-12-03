'use strict';

/**
 * F_N To visualize cyclic processes in the console
 * @param {Number} index - The number of the cycle iteration
 * @param {Count} count - The total amount of iterations
 * @returns 
 */
module.exports = function processProgress(index, count) {
    let readyRow = `\x1b[92m 100.00% ▮▮▮▮▮ ▮▮▮▮▮ ▮▮▮▮▮ ▮▮▮▮▮ ▮▮▮▮▮ ▮▮▮▮▮ ▮▮▮▮▮ ▮▮▮▮▮ ▮▮▮▮▮ ▮▮▮▮▮ \x1b[0m `;
    
    if (index || index === 0) {
        if (index % 25 === 0) {
            let perc = (index * 100 / count).toFixed(2)
            perc = perc != '100.00' && perc.length === 4 ? `0${perc}` : perc
            let numb = perc != '100.00' ? perc.substring(0, 2) : 100
            let line = buildLine(parseInt(numb))

            function buildLine(numb) {
                let line = ``
                let blockEmp = '▯▯▯▯▯ '
                let block = {
                    0: '▮▮▮▮▮ ',
                    2: '▮▯▯▯▯ ',
                    4: '▮▮▯▯▯ ',
                    6: '▮▮▮▯▯ ',
                    8: '▮▮▮▮▯ ',
                }

                if (numb < 10) {
                    line = lastPart(numb)
                    for (let index = 0; index < 9; index++) {
                        line += blockEmp
                    }
                } else {
                    numb = String(numb)
                    let a = numb[0]
                    let b = numb[1]
                    let c = numb[2] || null
                    if (!c) {
                        line = `${firstPart(parseInt(a))}${lastPart(parseInt(b))}`
                        for (let index = 0; index < 9 - parseInt(a); index++) {
                            line += blockEmp
                        }
                    }
                }

                function firstPart(numb) {
                    let res = ''
                    for (let index = 0; index < numb; index++) {
                        res += block[0]
                    }
                    return res
                }

                function lastPart(numb) {
                    let res = ''
                    if (numb % 2 === 0) {
                        numb === 0
                            ? res = blockEmp
                            : res = block[`${numb}`]

                    } else {
                        numb = Math.round(numb - 1)
                        numb === 0
                            ? res = blockEmp
                            : res = block[`${numb}`]
                    }
                    return res
                }

                return line
            }

            if (perc != '100.00')
                console.log(`\x1b[92m ${perc}% \x1b[93m ${line} \x1b[0m `);
            return perc
        }
    } else {
        console.log(readyRow);
        return true
    }
}