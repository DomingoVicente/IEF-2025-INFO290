module.exports = {
    name: 'Pattern42',
    sheetIndex: 42,
    primaryKeySheetIndex: 42, // Índice de la hoja para llaves primarias, no se que es
    primaryKeyColumn: 'L', // Columna para llaves primarias
    baseStartRow: 126,
    basePrimaryKeyStartRow: 126,
    startRowIncrement: 38,
    primaryKeyStartRowIncrement: 38,
    names: ['A', 'B', 'C', 'D', 'E','X','Y','Z','W','F'], //no se que es
    baseDataStartRowBDA: [3,3,3,3,3,3,3,3,3,3], // donde esta la primera clave de bda
    dataStartRowIncrementBDA: [21,21,21,21,21,,21,21,21,21,21,21], //salto de claves bda
    baseDataStartRowBFE: [3,3,3,3,3,3,3,3,3,3], // donde esta la primera clave de bda
    dataStartRowIncrementBFE: [197,197,197,197,197,197,197,197,197,197,197,197], //salto de claves bda
    defaultRowGap: [0,0,1,0,1,0,1,0,1,0], //si hay que saltarse algo en la plantilla (fila vacia)
    defaultTotalRows: [3,1,1,1,1,1,1,1,1,1], /// catidad de filas
    sourceWorkbook1Sheets: ['Superficie_ Tierras convert SL','Superficie_ Tierras convert SL','Superficie_ Tierras convert SL','Superficie_ Tierras convert SL','Superficie_ Tierras convert SL','Superficie_ Tierras convert SL', 'Superficie_ Tierras convert SL', 'Superficie_ Tierras convert SL', 'Superficie_ Tierras convert SL', 'Superficie_ Tierras convert SL'], //plantillas bda workbookBDA buscarb
    sourceWorkbook2Sheets: ['DOM ','DOM ','DOM ','DOM ','DOM ','DOM ','DOM ','DOM ','DOM ','DOM '], //plantillas para bfe workbookBFE buscarb o useDirectRange
    sourceExtractColumns1Base: ['D','D','D','D','D','D','D','D','D','D'], //columna de donde esta el año bda
    sourceExtractColumns2Base: ['F', 'F', 'F', 'F', 'F','F', 'F', 'F', 'F', 'F'], //columna de donde esta el año bfe
    useDirectRange: [false, false, false, false, false,], // la usa para el workbookBF cuando itera de 1 en 1
    directRangeStart: [null, null, null, null, null], //donde empieza a iterar
    directRangeEnd: [null, null, null, null, null], //donde termina de iterar
    specialRowIndex: [null, null, null, null, null], // donde va air a buscar la clave estra para la condicion especial anterior
    specialRowIndexIncrement: [0,0,0,0,0], // salto de claves para condicion especial
    fixedRangePKboolBDA: [true, true,true,true,true,true, true,true,true,true], // para buscar en un range especifico en caso de que las claves no sean seguidas
    specialRangePKBDA: [680, 680,680,680,680,680, 680,680,680,680], //rango de filas en que va a buscar
    fixedRangePKboolBFE: [true, true,true,true,true,true, true,true,true,true], // para buscar en un range especifico en caso de que las claves no sean seguidas
    specialRangePKBFE: [214,214,214,214,214,214,214,214,214,214], //rango de filas en que va a buscar
    destinationColumns: [
        [
            { operationName: 'workbookBDA', destinationColumn: 'D'},                    
            { operationName: 'customWorkbookBFE', destinationColumn:'E',searchColumn: 'C', sourceSheetName: 'DOM ', extractColumn: 'F',dataStartRow: 197,fixedRangePKbool: true, specialRangePK: 214},                        { operationName: 'formula', destinationColumn: 'F', formula: '=0'},
            { operationName: 'formula', destinationColumn: 'G', formula: '=1'},
            { operationName: 'formula', destinationColumn: 'H', formula: '=D{row}*(F{row}-E{row})/G{row}'},
            { operationName: 'formula', destinationColumn: 'I', formula: '=(H{row} * {factorEmisionB12})/1000'},             
        ],
        [{
            operationName: 'formula-niconii',
            destinationColumn: 'D', // Columna donde se almacenará el resultado
            formula: '=SUMA(D{startRow}:D{endRow})', // Fórmula con rangos dinámicos
            totalRowsFormula: 16, // Total de iteraciones (por ejemplo, 5 bloques de SUMA)
            destinationStartRowFormula: 126, // Fila de inicio para las operaciones
            rangeOffsetFormula: 38, // Diferencia entre bloques de rangos
            rangeSize: 3, // Cantidad de filas dentro de cada rango
            suma:false,
            
            },
          {
            operationName: 'formula-niconii',
            destinationColumn: 'H', // Columna donde se almacenará el resultado
            formula: '=SUMA(H{startRow}:H{endRow})', // Fórmula con rangos dinámicos
            totalRowsFormula: 16, // Total de iteraciones (por ejemplo, 5 bloques de SUMA)
            destinationStartRowFormula: 126, // Fila de inicio para las operaciones
            rangeOffsetFormula: 38, // Diferencia entre bloques de rangos
            rangeSize: 3, // Cantidad de filas dentro de cada rango
            suma:false,            
            },
            {
            operationName: 'formula-niconii',
            destinationColumn: 'I', // Columna donde se almacenará el resultado
            formula: '=SUMA(I{startRow}:I{endRow})', // Fórmula con rangos dinámicos
            totalRowsFormula: 16, // Total de iteraciones (por ejemplo, 5 bloques de SUMA)
            destinationStartRowFormula: 126, // Fila de inicio para las operaciones
            rangeOffsetFormula: 38, // Diferencia entre bloques de rangos
            rangeSize: 3, // Cantidad de filas dentro de cada rango
            suma:false,         
            }      
        ],
        [
            { operationName: 'workbookBDA', destinationColumn: 'D'},
            { operationName: 'formula', destinationColumn: 'E', formula: '=0'},
            { operationName: 'formula', destinationColumn: 'F', formula: '=0'},
            { operationName: 'formula', destinationColumn: 'G', formula: '=1'},
            { operationName: 'formula', destinationColumn: 'I', formula: '=D{row}*(F{row}-E{row})/G{row}'},                        
        ],
        [{
            operationName: 'formula-niconii',
            destinationColumn: 'D', // Columna donde se almacenará el resultado
            formula: '=SUMA(D{startRow}:D{endRow})', // Fórmula con rangos dinámicos
            totalRowsFormula: 16, // Total de iteraciones (por ejemplo, 5 bloques de SUMA)
            destinationStartRowFormula: 130, // Fila de inicio para las operaciones
            rangeOffsetFormula: 38, // Diferencia entre bloques de rangos
            rangeSize: 1, // Cantidad de filas dentro de cada rango
            suma:false,
            distancia:1,
            
            },
          {
            operationName: 'formula-niconii',
            destinationColumn: 'H', // Columna donde se almacenará el resultado
            formula: '=SUMA(H{startRow}:H{endRow})', // Fórmula con rangos dinámicos
            totalRowsFormula: 16, // Total de iteraciones (por ejemplo, 5 bloques de SUMA)
            destinationStartRowFormula: 130, // Fila de inicio para las operaciones
            rangeOffsetFormula: 38, // Diferencia entre bloques de rangos
            rangeSize: 1, // Cantidad de filas dentro de cada rango
            suma:false,
            distancia:1,            
            },
            {
            operationName: 'formula-niconii',
            destinationColumn: 'I', // Columna donde se almacenará el resultado
            formula: '=SUMA(I{startRow}:I{endRow})', // Fórmula con rangos dinámicos
            totalRowsFormula: 16, // Total de iteraciones (por ejemplo, 5 bloques de SUMA)
            destinationStartRowFormula: 130, // Fila de inicio para las operaciones
            rangeOffsetFormula: 38, // Diferencia entre bloques de rangos
            rangeSize: 1, // Cantidad de filas dentro de cada rango
            suma:false,    
            distancia:1,     
            }      
        ],
        [
            { operationName: 'workbookBDA', destinationColumn: 'D'},
            { operationName: 'formula', destinationColumn: 'E', formula: '=0'},
            { operationName: 'formula', destinationColumn: 'F', formula: '=0'},
            { operationName: 'formula', destinationColumn: 'G', formula: '=1'},
            { operationName: 'formula', destinationColumn: 'I', formula: '=D{row}*(F{row}-E{row})/G{row}'},   
        ],
        [{
            operationName: 'formula-niconii',
            destinationColumn: 'D', // Columna donde se almacenará el resultado
            formula: '=SUMA(D{startRow}:D{endRow})', // Fórmula con rangos dinámicos
            totalRowsFormula: 16, // Total de iteraciones (por ejemplo, 5 bloques de SUMA)
            destinationStartRowFormula: 133, // Fila de inicio para las operaciones
            rangeOffsetFormula: 38, // Diferencia entre bloques de rangos
            rangeSize: 1, // Cantidad de filas dentro de cada rango
            suma:false,
            distancia:1,
            
            },
          {
            operationName: 'formula-niconii',
            destinationColumn: 'H', // Columna donde se almacenará el resultado
            formula: '=SUMA(H{startRow}:H{endRow})', // Fórmula con rangos dinámicos
            totalRowsFormula: 16, // Total de iteraciones (por ejemplo, 5 bloques de SUMA)
            destinationStartRowFormula: 133, // Fila de inicio para las operaciones
            rangeOffsetFormula: 38, // Diferencia entre bloques de rangos
            rangeSize: 1, // Cantidad de filas dentro de cada rango
            suma:false,
            distancia:1,            
            },
            {
            operationName: 'formula-niconii',
            destinationColumn: 'I', // Columna donde se almacenará el resultado
            formula: '=SUMA(I{startRow}:I{endRow})', // Fórmula con rangos dinámicos
            totalRowsFormula: 16, // Total de iteraciones (por ejemplo, 5 bloques de SUMA)
            destinationStartRowFormula: 133, // Fila de inicio para las operaciones
            rangeOffsetFormula: 38, // Diferencia entre bloques de rangos
            rangeSize: 1, // Cantidad de filas dentro de cada rango
            suma:false,    
            distancia:1,     
            }      
        ],
        [
            { operationName: 'workbookBDA', destinationColumn: 'D'},
            { operationName: 'formula', destinationColumn: 'E', formula: '=0'},
            { operationName: 'formula', destinationColumn: 'F', formula: '=0'},
            { operationName: 'formula', destinationColumn: 'G', formula: '=1'},
            { operationName: 'formula', destinationColumn: 'I', formula: '=D{row}*(F{row}-E{row})/G{row}'},   
        ],
        [{
            operationName: 'formula-niconii',
            destinationColumn: 'D', // Columna donde se almacenará el resultado
            formula: '=SUMA(D{startRow}:D{endRow})', // Fórmula con rangos dinámicos
            totalRowsFormula: 16, // Total de iteraciones (por ejemplo, 5 bloques de SUMA)
            destinationStartRowFormula: 136, // Fila de inicio para las operaciones
            rangeOffsetFormula: 38, // Diferencia entre bloques de rangos
            rangeSize: 1, // Cantidad de filas dentro de cada rango
            suma:false,
            distancia:1,
            
            },
          {
            operationName: 'formula-niconii',
            destinationColumn: 'H', // Columna donde se almacenará el resultado
            formula: '=SUMA(H{startRow}:H{endRow})', // Fórmula con rangos dinámicos
            totalRowsFormula: 16, // Total de iteraciones (por ejemplo, 5 bloques de SUMA)
            destinationStartRowFormula: 136, // Fila de inicio para las operaciones
            rangeOffsetFormula: 38, // Diferencia entre bloques de rangos
            rangeSize: 1, // Cantidad de filas dentro de cada rango
            suma:false,
            distancia:1,            
            },
            {
            operationName: 'formula-niconii',
            destinationColumn: 'I', // Columna donde se almacenará el resultado
            formula: '=SUMA(I{startRow}:I{endRow})', // Fórmula con rangos dinámicos
            totalRowsFormula: 16, // Total de iteraciones (por ejemplo, 5 bloques de SUMA)
            destinationStartRowFormula: 136, // Fila de inicio para las operaciones
            rangeOffsetFormula: 38, // Diferencia entre bloques de rangos
            rangeSize: 1, // Cantidad de filas dentro de cada rango
            suma:false,    
            distancia:1,     
            }      
        ],
        [
            { operationName: 'workbookBDA', destinationColumn: 'D'},
            { operationName: 'formula', destinationColumn: 'E', formula: '=0'},
            { operationName: 'formula', destinationColumn: 'F', formula: '=0'},
            { operationName: 'formula', destinationColumn: 'G', formula: '=1'},
            { operationName: 'formula', destinationColumn: 'I', formula: '=D{row}*(F{row}-E{row})/G{row}'},   
        ],
        [{
            operationName: 'formula-niconii',
            destinationColumn: 'D', // Columna donde se almacenará el resultado
            formula: '=SUMA(D{startRow}:D{endRow})', // Fórmula con rangos dinámicos
            totalRowsFormula: 16, // Total de iteraciones (por ejemplo, 5 bloques de SUMA)
            destinationStartRowFormula: 139, // Fila de inicio para las operaciones
            rangeOffsetFormula: 38, // Diferencia entre bloques de rangos
            rangeSize: 1, // Cantidad de filas dentro de cada rango
            suma:false,
            distancia:1,
            
            },
          {
            operationName: 'formula-niconii',
            destinationColumn: 'H', // Columna donde se almacenará el resultado
            formula: '=SUMA(H{startRow}:H{endRow})', // Fórmula con rangos dinámicos
            totalRowsFormula: 16, // Total de iteraciones (por ejemplo, 5 bloques de SUMA)
            destinationStartRowFormula: 139, // Fila de inicio para las operaciones
            rangeOffsetFormula: 38, // Diferencia entre bloques de rangos
            rangeSize: 1, // Cantidad de filas dentro de cada rango
            suma:false,
            distancia:1,            
            },
            {
            operationName: 'formula-niconii',
            destinationColumn: 'I', // Columna donde se almacenará el resultado
            formula: '=SUMA(I{startRow}:I{endRow})', // Fórmula con rangos dinámicos
            totalRowsFormula: 16, // Total de iteraciones (por ejemplo, 5 bloques de SUMA)
            destinationStartRowFormula: 139, // Fila de inicio para las operaciones
            rangeOffsetFormula: 38, // Diferencia entre bloques de rangos
            rangeSize: 1, // Cantidad de filas dentro de cada rango
            suma:false,    
            distancia:1,     
            }      
        ]
    ],
}