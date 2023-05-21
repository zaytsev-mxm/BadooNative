import { FC } from 'react';
import {
    Image,
    Text,
    View,
    Pressable,
    PressableProps,
    Dimensions,
} from 'react-native';

import styles from './styles';

type Props = {
    picture: string;
    name: string;
    age: string;
    location: string;
    isOnline: boolean;
    onPress: (props: PressableProps) => void;
};

const { height, width } = Dimensions.get('window');

const PersonThumbnail: FC<Props> = (props) => {
    const { picture, name, age, location, isOnline, onPress } = props;
    return (
        <Pressable onPress={onPress}>
            <View style={[styles.root, { width: (width - 80) / 2 }]}>
                <View style={styles.picture}>
                    <Image source={{ uri: picture }} style={styles.image} />
                </View>
                <View style={styles.info}>
                    <View style={styles.topLine}>
                        <Text numberOfLines={1} style={styles.topLineText}>
                            {name}, {age}
                        </Text>
                    </View>
                    <View style={styles.bottomLine}>
                        <View
                            style={[
                                styles.status,
                                isOnline ? styles.online : styles.offline,
                            ]}
                        ></View>
                        <Text numberOfLines={1}>{location}</Text>
                    </View>
                </View>
            </View>
        </Pressable>
    );
};

export default PersonThumbnail;
