import * as React from 'react';
import { createContext, useContext, useEffect, useState } from 'react';
import {
    SafeAreaView,
    ScrollView,
    SectionList,
    SectionListData,
    SectionListRenderItemInfo,
    StyleSheet,
    Text, TouchableHighlight,
    TouchableOpacity,
    View
} from 'react-native';
import type { ICallApi } from "./ApiSample";
import ApiSample from "./ApiSample";

interface ILogContext {
    clear: () => void;
    log: (log: string | object, type?: string) => void;
    logs: string;
}

const LogContext = createContext<ILogContext>({
    clear: () => {
    },
    log: () => {
    },
    logs: ""
})

const RenderSectionHader = (info: { section: SectionListData<ICallApi> }) => {
    return (
        <Text style={styles.sectionHeader}>{info.section.key}</Text>
    )
}

interface RenderItemProps {
    info: SectionListRenderItemInfo<ICallApi>;
}

function timestamp(): string {
    var today = new Date();
    today.setHours(today.getHours() + 9);
    return today.toISOString().replace('T', ' ').substring(11, 23);
}

const RenderItem = (props: RenderItemProps) => {
    const {clear, log} = useContext<ILogContext>(LogContext)
    const [toggle, setToggle] = useState<boolean>(false)
    const execute = async (item: ICallApi) => {
        try {
            clear()
            log(`CALL - ${item.name}`)
            const result: any = await item.exec(log)
            log(result, 'RES')
        } catch (e) {
            let err = e as ApiError
            log(`ERR -> ${JSON.stringify({
                code: err.code,
                message: err.message
            }, null, 2)}`)
        }
    }
    const moreCaseToggle = () => {
        setToggle(!toggle);
    }
    return (
        <View style={styles.buttonBox}>
            <TouchableOpacity onPress={() => execute(props.info.item)} style={styles.buttonPrimary}>
                <Text style={styles.buttonPrimaryText}>{props.info.item.name}</Text>
            </TouchableOpacity>
            {props.info.item.case ? (
                <TouchableHighlight onPress={moreCaseToggle}
                                    style={{...styles.buttonWarning, ...{position: 'absolute', right: 10}}}>
                    <Text style={styles.buttonWarningText}>{toggle ? '▲' : '☰'}</Text>
                </TouchableHighlight>
            ) : null}
            {
                toggle ? props.info.item.case?.map(v => (
                    <TouchableOpacity key={v.name} onPress={() => execute(v)}
                                      style={{...styles.buttonSuccess, ...{marginLeft: 20}}}>
                        <Text style={styles.buttonSuccessText}>{v.name}</Text>
                    </TouchableOpacity>
                )) : null
            }
        </View>
    )
}
export default function App() {
    const [logs, setLogs] = useState<string>("");
    const [kakaoInit, setKakaoInit] = useState<boolean>(true)
    let logTemp = ''
    const log = (data: string | object, type?: string) => {
        let logData = data;
        if (typeof data == 'object') {
            if (type == 'RES') {
                logData = JSON.stringify(data, null, 2)
            } else {
                logData = JSON.stringify(data)
            }
        }
        logTemp += `${logTemp ? '\n' : ''}[${timestamp()}] ${type ? type + " -> " : ""}${logData}`
        setLogs(logTemp)
    }
    const clear = () => {
        logTemp = ''
        setLogs('')
    }
    useEffect(() => {
        // KakaoSDK.init().then(setKakaoInit)
    }, [true])
    return (
        <LogContext.Provider value={{
            logs, log, clear
        }}>
            {
                kakaoInit ?
                    <SafeAreaView style={styles.container}>
                        <SectionList
                            style={styles.listBox}
                            sections={ApiSample}
                            keyExtractor={(item) => item.name}
                            renderSectionHeader={RenderSectionHader}
                            renderItem={(info) => <RenderItem info={info}/>}
                        />
                        <View style={styles.logBox}>
                            <View style={styles.logTitleBox}>
                                <Text style={styles.logTitle}>LOG</Text>
                            </View>
                            <ScrollView>
                                <Text selectable={true} style={styles.logText}>{logs}</Text>
                            </ScrollView>
                        </View>
                    </SafeAreaView>
                    : null
            }

        </LogContext.Provider>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    sectionHeader: {
        paddingTop: 2,
        paddingLeft: 10,
        paddingRight: 10,
        paddingBottom: 2,
        fontSize: 14,
        fontWeight: 'bold',
        backgroundColor: 'rgba(247,247,247,1.0)',
    },
    itemBox: {
        paddingLeft: 10
    },
    listBox: {
        flex: 0.65
    },
    logBox: {
        flex: 0.35,
        backgroundColor: '#F1EEE9'
    },
    logTitleBox: {
        backgroundColor: '#73777B'
    },
    logTitle: {
        color: '#FFFFFF',
        fontWeight: 'bold'
    },
    logText: {},
    button: {
        backgroundColor: '#DDDDDD',
        padding: 8
    },
    buttonBox: {
        paddingLeft: 10,
        paddingRight: 10,
        marginTop: 1,
        marginBottom: 1
    },
    buttonPrimary: {
        backgroundColor: '#0D6EFD',
        color: '#FFFFFF',
        padding: 8
    },
    buttonSuccess: {
        backgroundColor: '#28A745',
        color: '#FFFFFF',
        padding: 8
    },
    buttonDanger: {
        backgroundColor: '#DC3545',
        color: '#FFFFFF',
        padding: 8
    },
    buttonWarning: {
        backgroundColor: '#ffc107',
        color: '#FFFFFF',
        padding: 8
    },
    buttonPrimaryText: {
        color: '#FFFFFF'
    },
    buttonSuccessText: {
        color: '#FFFFFF'
    },
    buttonDangerText: {
        color: '#FFFFFF'
    },
    buttonWarningText: {
        color: '#212529'
    },
});
