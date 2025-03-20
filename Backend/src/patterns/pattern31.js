module.exports = {
    name: 'Pattern31',
    sheetIndex: 31,
    primaryKeySheetIndex: 31, // Índice de la hoja para llaves primarias, no se que es
    primaryKeyColumn: 'Q', // Columna para llaves primarias
    baseStartRow: 141,
    basePrimaryKeyStartRow: 141,
    startRowIncrement: 40,
    primaryKeyStartRowIncrement: 40,
    names: ['B','X','Y','Z','W','A','C','D','E','F','G'], //no se que es
    baseDataStartRowBDA: [1,1,1,1,1,1,1,1,1,1,1], // donde esta la primera clave de bda
    baseDataStartRowBFE: [157,157,157,157,157,157,157,157,157,157,157], // donde esta la primera clave de bda
    defaultRowGap: [0,0,0,1,0,1,0,1,0,1,0], //si hay que saltarse algo en la plantilla (fila vacia)
    defaultTotalRows: [1,2,1,1,1,1,1,1,1,1,1], /// catidad de filas a llenar
    sourceWorkbook1Sheets: ['Superf_transicion_GL','Superf_transicion_GL','Superf_transicion_GL','Superf_transicion_GL','Superf_transicion_GL','Superf_transicion_GL','Superf_transicion_GL','Superf_transicion_GL','Superf_transicion_GL','Superf_transicion_GL','Superf_transicion_GL'], //plantillas bda workbookBDA buscarb
    sourceWorkbook2Sheets: ['Carbono del suelo','Carbono del suelo','Carbono del suelo','Carbono del suelo','Carbono del suelo','Carbono del suelo','Carbono del suelo','Carbono del suelo','Carbono del suelo','Carbono del suelo','Carbono del suelo'], //plantillas para bfe workbookBFE buscarb o useDirectRange
    sourceExtractColumns1Base: ['D','D','D','D','D','D','D','D','D','D','D'], //columna de donde esta el año bda
    sourceExtractColumns2Base: ['F','F','F','F','F','F','F','F','F','F','F'], //columna de donde esta el año bfe
    useDirectRange: [false,false,false,false,false,false,false,false,false,false,false], // la usa para el workbookBF cuando itera de 1 en 1
    specialRowIndex: [null,null,null,null,null,null,null,null,null,null,null], // donde va air a buscar la clave estra para la condicion especial anterior
    specialRowIndexIncrement: [0], // salto de claves para condicion especial
    fixedRangePKboolBDA: [true,true,true,true,true,true,true,true,true,true,true], // para buscar en un range especifico en caso de que las claves no sean seguidas
    specialRangePKBDA: [682,682,682,682,682,682,682,682,682,682,682], //rango de filas en que va a buscar
    fixedRangePKboolBFE: [true,true,true,true,true,true,true,true,true,true,true], // para buscar en un range especifico en caso de que las claves no sean seguidas
    specialRangePKBFE: [174,174,174,174,174,174,174,174,174,174,174], //rango de filas en que va a buscar
    destinationColumns: [
        [{ operationName: 'workbookBDA', destinationColumn: 'D', specialCondition:true },
            { operationName: 'fixed', destinationColumn: 'E' ,sourceSheetName: 'Carbono del suelo', fixedCell: 'K{2}'},
            { operationName: 'manualValue', destinationColumn: 'F', manualValue: 20},
            { operationName: 'fixed', destinationColumn: 'G' ,sourceSheetName: 'Carbono del suelo', fixedCell: 'K{45}'},
            { operationName: 'fixed', destinationColumn: 'H' ,sourceSheetName: 'Carbono del suelo', fixedCell: 'L{45}'},
            { operationName: 'fixed', destinationColumn: 'I' ,sourceSheetName: 'Carbono del suelo', fixedCell: 'M{45}'},
            { operationName: 'fixed', destinationColumn: 'J' ,sourceSheetName: 'Carbono del suelo', fixedCell: 'B92'},
            { operationName: 'fixed', destinationColumn: 'K' ,sourceSheetName: 'Carbono del suelo', fixedCell: 'C92'},
            { operationName: 'fixed', destinationColumn: 'L' ,sourceSheetName: 'Carbono del suelo', fixedCell: 'D92'},
            { operationName: 'formula', destinationColumn: 'M', formula: '=((D{row}*E{row}*G{row}*H{row}*I{row})-(D{row}*E{row}*J{row}*K{row}*L{row}))/F{row}' },
            { operationName: 'formula', destinationColumn: 'N', formula: '=(M{row} * {factorEmisionB12})/1000' },
        ],
        [
            { operationName: 'workbookBDA', destinationColumn: 'D', specialCondition:true },
            { operationName: 'fixed', destinationColumn: 'E' ,sourceSheetName: 'Carbono del suelo', fixedCell: 'K{2}'},
            { operationName: 'manualValue', destinationColumn: 'F', manualValue: 20},
            { operationName: 'fixed', destinationColumn: 'G' ,sourceSheetName: 'Carbono del suelo', fixedCell: 'K{45}'},
            { operationName: 'fixed', destinationColumn: 'H' ,sourceSheetName: 'Carbono del suelo', fixedCell: 'L{45}'},
            { operationName: 'fixed', destinationColumn: 'I' ,sourceSheetName: 'Carbono del suelo', fixedCell: 'M{45}'},
            { operationName: 'fixed', destinationColumn: 'J' ,sourceSheetName: 'Carbono del suelo', fixedCell: 'B93'},
            { operationName: 'fixed', destinationColumn: 'K' ,sourceSheetName: 'Carbono del suelo', fixedCell: 'C93'},
            { operationName: 'fixed', destinationColumn: 'L' ,sourceSheetName: 'Carbono del suelo', fixedCell: 'D93'},
            { operationName: 'formula', destinationColumn: 'M', formula: '=((D{row}*E{row}*G{row}*H{row}*I{row})-(D{row}*E{row}*J{row}*K{row}*L{row}))/F{row}' },
            { operationName: 'formula', destinationColumn: 'N', formula: '=(M{row} * {factorEmisionB12})/1000' },

        ],
        [{
            operationName: 'formula-niconii',
            destinationColumn: 'D', // Columna donde se almacenará el resultado
            formula: '=SUMA(D{startRow}:D{endRow})', // Fórmula con rangos dinámicos
            totalRowsFormula: 16, // Total de iteraciones (por ejemplo, 5 bloques de SUMA)
            destinationStartRowFormula: 141, // Fila de inicio para las operaciones
            rangeOffsetFormula: 40, // Diferencia entre bloques de rangos
            rangeSize: 3, // Cantidad de filas dentro de cada rango
            suma:false,
            
            },
          {
            operationName: 'formula-niconii',
            destinationColumn: 'M', // Columna donde se almacenará el resultado
            formula: '=SUMA(M{startRow}:M{endRow})', // Fórmula con rangos dinámicos
            totalRowsFormula: 16, // Total de iteraciones (por ejemplo, 5 bloques de SUMA)
            destinationStartRowFormula: 141, // Fila de inicio para las operaciones
            rangeOffsetFormula: 40, // Diferencia entre bloques de rangos
            rangeSize: 3, // Cantidad de filas dentro de cada rango
            suma:false,            
            },
            {
            operationName: 'formula-niconii',
            destinationColumn: 'N', // Columna donde se almacenará el resultado
            formula: '=SUMA(N{startRow}:N{endRow})', // Fórmula con rangos dinámicos
            totalRowsFormula: 16, // Total de iteraciones (por ejemplo, 5 bloques de SUMA)
            destinationStartRowFormula: 141, // Fila de inicio para las operaciones
            rangeOffsetFormula: 40, // Diferencia entre bloques de rangos
            rangeSize: 3, // Cantidad de filas dentro de cada rango
            suma:false,         
            }      
        ]
        ,[
            { operationName: 'workbookBDA', destinationColumn: 'D', specialCondition:true },
            { operationName: 'fixed', destinationColumn: 'E' ,sourceSheetName: 'Carbono del suelo', fixedCell: 'K{2}'},
            { operationName: 'manualValue', destinationColumn: 'F', manualValue: 20},
            { operationName: 'fixed', destinationColumn: 'G' ,sourceSheetName: 'Carbono del suelo', fixedCell: 'K{45}'},
            { operationName: 'fixed', destinationColumn: 'H' ,sourceSheetName: 'Carbono del suelo', fixedCell: 'L{45}'},
            { operationName: 'fixed', destinationColumn: 'I' ,sourceSheetName: 'Carbono del suelo', fixedCell: 'M{45}'},
            { operationName: 'fixed', destinationColumn: 'J' ,sourceSheetName: 'Carbono del suelo', fixedCell: 'H{45}'},
            { operationName: 'fixed', destinationColumn: 'K' ,sourceSheetName: 'Carbono del suelo', fixedCell: 'I{45}'},
            { operationName: 'fixed', destinationColumn: 'L' ,sourceSheetName: 'Carbono del suelo', fixedCell: 'J{45}'},
            { operationName: 'formula', destinationColumn: 'M', formula: '=((D{row}*E{row}*G{row}*H{row}*I{row})-(D{row}*E{row}*J{row}*K{row}*L{row}))/F{row}' },
            { operationName: 'formula', destinationColumn: 'N', formula: '=(M{row} * {factorEmisionB12})/1000' },
        ],
        [{
            operationName: 'formula-niconii',
            destinationColumn: 'D', // Columna donde se almacenará el resultado
            formula: '=SUMA(D{startRow}:D{endRow})', // Fórmula con rangos dinámicos
            totalRowsFormula: 16, // Total de iteraciones (por ejemplo, 5 bloques de SUMA)
            destinationStartRowFormula: 145, // Fila de inicio para las operaciones
            rangeOffsetFormula: 40, // Diferencia entre bloques de rangos
            rangeSize: 1, // Cantidad de filas dentro de cada rango
            suma:false,
            distancia:1,
            
            },
          {
            operationName: 'formula-niconii',
            destinationColumn: 'M', // Columna donde se almacenará el resultado
            formula: '=SUMA(M{startRow}:M{endRow})', // Fórmula con rangos dinámicos
            totalRowsFormula: 16, // Total de iteraciones (por ejemplo, 5 bloques de SUMA)
            destinationStartRowFormula: 145, // Fila de inicio para las operaciones
            rangeOffsetFormula: 40, // Diferencia entre bloques de rangos
            rangeSize: 1, // Cantidad de filas dentro de cada rango
            suma:false,
            distancia:1,            
            },
            {
            operationName: 'formula-niconii',
            destinationColumn: 'N', // Columna donde se almacenará el resultado
            formula: '=SUMA(N{startRow}:N{endRow})', // Fórmula con rangos dinámicos
            totalRowsFormula: 16, // Total de iteraciones (por ejemplo, 5 bloques de SUMA)
            destinationStartRowFormula: 145, // Fila de inicio para las operaciones
            rangeOffsetFormula: 40, // Diferencia entre bloques de rangos
            rangeSize: 1, // Cantidad de filas dentro de cada rango
            suma:false,    
            distancia:1,     
            }      
        ],
        [
            { operationName: 'workbookBDA', destinationColumn: 'D', specialCondition:true },
            { operationName: 'fixed', destinationColumn: 'E' ,sourceSheetName: 'Carbono del suelo', fixedCell: 'K{2}'},
            { operationName: 'manualValue', destinationColumn: 'F', manualValue: 20},
            { operationName: 'fixed', destinationColumn: 'G' ,sourceSheetName: 'Carbono del suelo', fixedCell: 'K{45}'},
            { operationName: 'fixed', destinationColumn: 'H' ,sourceSheetName: 'Carbono del suelo', fixedCell: 'L{45}'},
            { operationName: 'fixed', destinationColumn: 'I' ,sourceSheetName: 'Carbono del suelo', fixedCell: 'M{45}'},
            { operationName: 'fixed', destinationColumn: 'J' ,sourceSheetName: 'Carbono del suelo', fixedCell: 'N{45}'},
            { operationName: 'fixed', destinationColumn: 'K' ,sourceSheetName: 'Carbono del suelo', fixedCell: 'O{45}'},
            { operationName: 'fixed', destinationColumn: 'L' ,sourceSheetName: 'Carbono del suelo', fixedCell: 'P{45}'},
            { operationName: 'formula', destinationColumn: 'M', formula: '=((D{row}*E{row}*G{row}*H{row}*I{row})-(D{row}*E{row}*J{row}*K{row}*L{row}))/F{row}' },
            { operationName: 'formula', destinationColumn: 'N', formula: '=(M{row} * {factorEmisionB12})/1000' },
        ],
        [{
            operationName: 'formula-niconii',
            destinationColumn: 'D', // Columna donde se almacenará el resultado
            formula: '=SUMA(D{startRow}:D{endRow})', // Fórmula con rangos dinámicos
            totalRowsFormula: 16, // Total de iteraciones (por ejemplo, 5 bloques de SUMA)
            destinationStartRowFormula: 148, // Fila de inicio para las operaciones
            rangeOffsetFormula: 40, // Diferencia entre bloques de rangos
            rangeSize: 1, // Cantidad de filas dentro de cada rango
            suma:false,
            distancia:1,
            
            },
          {
            operationName: 'formula-niconii',
            destinationColumn: 'M', // Columna donde se almacenará el resultado
            formula: '=SUMA(M{startRow}:M{endRow})', // Fórmula con rangos dinámicos
            totalRowsFormula: 16, // Total de iteraciones (por ejemplo, 5 bloques de SUMA)
            destinationStartRowFormula: 148, // Fila de inicio para las operaciones
            rangeOffsetFormula: 40, // Diferencia entre bloques de rangos
            rangeSize: 1, // Cantidad de filas dentro de cada rango
            suma:false,
            distancia:1,            
            },
            {
            operationName: 'formula-niconii',
            destinationColumn: 'N', // Columna donde se almacenará el resultado
            formula: '=SUMA(N{startRow}:N{endRow})', // Fórmula con rangos dinámicos
            totalRowsFormula: 16, // Total de iteraciones (por ejemplo, 5 bloques de SUMA)
            destinationStartRowFormula: 148, // Fila de inicio para las operaciones
            rangeOffsetFormula: 40, // Diferencia entre bloques de rangos
            rangeSize: 1, // Cantidad de filas dentro de cada rango
            suma:false,    
            distancia:1,     
            }      
        ],
        [
            { operationName: 'workbookBDA', destinationColumn: 'D', specialCondition:true },
            { operationName: 'fixed', destinationColumn: 'E' ,sourceSheetName: 'Carbono del suelo', fixedCell: 'K{2}'},
            { operationName: 'manualValue', destinationColumn: 'F', manualValue: 20},
            { operationName: 'fixed', destinationColumn: 'G' ,sourceSheetName: 'Carbono del suelo', fixedCell: 'K{45}'},
            { operationName: 'fixed', destinationColumn: 'H' ,sourceSheetName: 'Carbono del suelo', fixedCell: 'L{45}'},
            { operationName: 'fixed', destinationColumn: 'I' ,sourceSheetName: 'Carbono del suelo', fixedCell: 'M{45}'},
            { operationName: 'fixed', destinationColumn: 'J' ,sourceSheetName: 'Carbono del suelo', fixedCell: 'B94'},
            { operationName: 'fixed', destinationColumn: 'K' ,sourceSheetName: 'Carbono del suelo', fixedCell: 'C94'},
            { operationName: 'fixed', destinationColumn: 'L' ,sourceSheetName: 'Carbono del suelo', fixedCell: 'D94'},
            { operationName: 'formula', destinationColumn: 'M', formula: '=((D{row}*E{row}*G{row}*H{row}*I{row})-(D{row}*E{row}*J{row}*K{row}*L{row}))/F{row}' },
            { operationName: 'formula', destinationColumn: 'N', formula: '=(M{row} * {factorEmisionB12})/1000' },
        ],
        [{
            operationName: 'formula-niconii',
            destinationColumn: 'D', // Columna donde se almacenará el resultado
            formula: '=SUMA(D{startRow}:D{endRow})', // Fórmula con rangos dinámicos
            totalRowsFormula: 16, // Total de iteraciones (por ejemplo, 5 bloques de SUMA)
            destinationStartRowFormula: 151, // Fila de inicio para las operaciones
            rangeOffsetFormula: 40, // Diferencia entre bloques de rangos
            rangeSize: 1, // Cantidad de filas dentro de cada rango
            suma:false,
            distancia:1,
            
            },
          {
            operationName: 'formula-niconii',
            destinationColumn: 'M', // Columna donde se almacenará el resultado
            formula: '=SUMA(M{startRow}:M{endRow})', // Fórmula con rangos dinámicos
            totalRowsFormula: 16, // Total de iteraciones (por ejemplo, 5 bloques de SUMA)
            destinationStartRowFormula: 151, // Fila de inicio para las operaciones
            rangeOffsetFormula: 40, // Diferencia entre bloques de rangos
            rangeSize: 1, // Cantidad de filas dentro de cada rango
            suma:false,
            distancia:1,            
            },
            {
            operationName: 'formula-niconii',
            destinationColumn: 'N', // Columna donde se almacenará el resultado
            formula: '=SUMA(N{startRow}:N{endRow})', // Fórmula con rangos dinámicos
            totalRowsFormula: 16, // Total de iteraciones (por ejemplo, 5 bloques de SUMA)
            destinationStartRowFormula: 151, // Fila de inicio para las operaciones
            rangeOffsetFormula: 40, // Diferencia entre bloques de rangos
            rangeSize: 1, // Cantidad de filas dentro de cada rango
            suma:false,    
            distancia:1,     
            }      
        ],
        [
            { operationName: 'workbookBDA', destinationColumn: 'D', specialCondition:true },
            { operationName: 'fixed', destinationColumn: 'E' ,sourceSheetName: 'Carbono del suelo', fixedCell: 'K{2}'},
            { operationName: 'manualValue', destinationColumn: 'F', manualValue: 20},
            { operationName: 'fixed', destinationColumn: 'G' ,sourceSheetName: 'Carbono del suelo', fixedCell: 'K{45}'},
            { operationName: 'fixed', destinationColumn: 'H' ,sourceSheetName: 'Carbono del suelo', fixedCell: 'L{45}'},
            { operationName: 'fixed', destinationColumn: 'I' ,sourceSheetName: 'Carbono del suelo', fixedCell: 'M{45}'},
            { operationName: 'fixed', destinationColumn: 'J' ,sourceSheetName: 'Carbono del suelo', fixedCell: 'T{45}'},
            { operationName: 'fixed', destinationColumn: 'K' ,sourceSheetName: 'Carbono del suelo', fixedCell: 'U{45}'},
            { operationName: 'fixed', destinationColumn: 'L' ,sourceSheetName: 'Carbono del suelo', fixedCell: 'V{45}'},
            { operationName: 'formula', destinationColumn: 'M', formula: '=((D{row}*E{row}*G{row}*H{row}*I{row})-(D{row}*E{row}*J{row}*K{row}*L{row}))/F{row}' },
            { operationName: 'formula', destinationColumn: 'N', formula: '=(M{row} * {factorEmisionB12})/1000' },
        ],
        [{
            operationName: 'formula-niconii',
            destinationColumn: 'D', // Columna donde se almacenará el resultado
            formula: '=SUMA(D{startRow}:D{endRow})', // Fórmula con rangos dinámicos
            totalRowsFormula: 16, // Total de iteraciones (por ejemplo, 5 bloques de SUMA)
            destinationStartRowFormula: 154, // Fila de inicio para las operaciones
            rangeOffsetFormula: 40, // Diferencia entre bloques de rangos
            rangeSize: 1, // Cantidad de filas dentro de cada rango
            suma:false,
            distancia:1,
            
            },
          {
            operationName: 'formula-niconii',
            destinationColumn: 'M', // Columna donde se almacenará el resultado
            formula: '=SUMA(M{startRow}:M{endRow})', // Fórmula con rangos dinámicos
            totalRowsFormula: 16, // Total de iteraciones (por ejemplo, 5 bloques de SUMA)
            destinationStartRowFormula: 154, // Fila de inicio para las operaciones
            rangeOffsetFormula: 40, // Diferencia entre bloques de rangos
            rangeSize: 1, // Cantidad de filas dentro de cada rango
            suma:false,
            distancia:1,            
            },
            {
            operationName: 'formula-niconii',
            destinationColumn: 'N', // Columna donde se almacenará el resultado
            formula: '=SUMA(N{startRow}:N{endRow})', // Fórmula con rangos dinámicos
            totalRowsFormula: 16, // Total de iteraciones (por ejemplo, 5 bloques de SUMA)
            destinationStartRowFormula: 154, // Fila de inicio para las operaciones
            rangeOffsetFormula: 40, // Diferencia entre bloques de rangos
            rangeSize: 1, // Cantidad de filas dentro de cada rango
            suma:false,    
            distancia:1,     
            }      
        ],
    ],
}