import classNames from 'classnames';

export default function (props, ref, key, opts = {}) {
    var startScreen;
    var onScreenStart;
    var onScreenStop;
    var onOpenReveal;
    var onCloseReveal;
    var onTimerComplete;

    startScreen = function (screenStart = true, callback) {
        let gameData = _.get(props, 'gameState.data.game', {});

        if (_.get(gameData, `levels.${opts.level}.complete`, false)) {
            _.assign(gameData, {
                levels: {
                    [opts.level]: {
                        complete: false,
                    }
                }
            });
        }

        this.updateGameData({
            key: 'game',
            data: _.defaults({
                screenStart,
                state: opts.level,
            }, gameData, {
                hits: 0,
                bagCount: 0,
                score: 0,
                lives: 1,
            }),
            callback,
        });
    };

    onScreenStart = function () {
        startScreen.call(this);
    };

    onScreenStop = function () {
        startScreen.call(this, false, () => {
            this.updateGameState({
                path: ['game'],
                data: {
                    bagCount: 0,
                    levels: {
                        [opts.level]: {
                            start: false,
                        }
                    },
                    state: 'default',
                },
            });

            startScreen.call(this);
        });
    };

    onOpenReveal = function () {
        setTimeout(() => {
            this.updateGameState({
                path: 'd-pad',
                data: {
                    pause: true
                },
            });
        }, 1000);
    };

    onCloseReveal = function (prevMessage) {
        this.updateGameState({
            path: 'reveal',
            data: {
                close: false,
                open: null,
            }
        });

        this.updateGameState({
            path: 'd-pad',
            data: {
                pause: false
            },
        });

        this.updateGameState({
            path: ['game'],
            data: {
                levels: {
                    [opts.level]: {
                        start: true,
                    }
                }
            },
        });

        if (prevMessage === 'complete') {
            skoash.Screen.prototype.goto(parseInt(key, 10) + 1);
        } else if (prevMessage === 'replay') {
            startScreen.call(this);
        }
    };

    onTimerComplete = function () {
        if (_.get(props, `gameState.data.game.levels.${opts.level}.complete`, false)) return;

        startScreen.call(this, false, () => {
            this.updateGameState({
                path: ['game'],
                data: {
                    bagCount: 0,
                    lives: _.get(props, 'gameState.data.game.lives', 1) - 1 || 1,
                    levels: {
                        [opts.level]: {
                            start: false,
                        }
                    }
                },
            });

            startScreen.call(this);
        });
    };

    return (
        <skoash.Screen
            {...props}
            ref={ref}
            key={key}
            id={`phaser-level-${opts.level}`}
            onStart={onScreenStart}
            onStop={onScreenStop}
        >
            <skoash.Timer
                countDown
                timeout={120000}
                onComplete={onTimerComplete}
                pause={
                    _.get(props, `gameState.data.game.levels.${opts.level}.start`, false) &&
                    _.get(props, 'data.reveal.open', false)
                }
                resume={!_.get(props, 'data.reveal.open', false)}
                stop={_.get(props, `gameState.data.game.levels.${opts.level}.complete`, false)}
                complete={_.get(props, `gameState.data.game.levels.${opts.level}.complete`, false)}
                checkComplete={_.get(props, `gameState.data.game.levels.${opts.level}.start`, false)}
                restart={_.get(props, `gameState.data.game.levels.${opts.level}.start`, false)}
            />
            <skoash.Component
                className="bottom"
                complete={_.get(props, `gameState.data.game.levels.${opts.level}.complete`, false)}
            >
                <skoash.Component
                    className="left"
                >
                    <skoash.Score
                        className="life"
                        correct={4 - _.get(props, 'gameState.data.game.hits', 0) || 0}
                        setScore={true}
                    />
                    <skoash.Score
                        className="bags"
                        correct={_.get(props, 'gameState.data.game.bagCount', 0)}
                        setScore={true}
                    />
                </skoash.Component>
                <skoash.Component
                    className="middle"
                >
                    <skoash.Score
                        className="level-score"
                        correct={_.get(props, 'gameState.data.game.score', 0)}
                        setScore={true}
                    />
                    <skoash.Component
                        className={classNames('level', `level-${opts.level}`)}
                    />
                </skoash.Component>
                <skoash.Component
                    className="right"
                >
                    <skoash.Score
                        className="lives"
                        correct={_.get(props, 'gameState.data.game.lives', 1)}
                        setScore={true}
                    />
                    <skoash.Score
                        className="trucks"
                        correct={_.get(props, `gameState.data.game.levels.${opts.level}.trucks`)}
                        setScore={true}
                    />
                    <skoash.DPad />
                </skoash.Component>
            </skoash.Component>
            <skoash.Reveal
                openOnStart="intro"
                openTarget="reveal"
                openReveal={_.get(props, 'data.reveal.open', false)}
                closeReveal={_.get(props, 'data.reveal.close', false)}
                onClose={onCloseReveal}
                onOpen={onOpenReveal}
                list={[
                    <skoash.Component
                        ref="intro"
                        className="intro frame square"
                        type="li"
                    >
                        <div className="content">
                            {opts.introContent}
                        </div>
                    </skoash.Component>,
                    <skoash.Component
                        ref="fact-1"
                        className="fact-1 frame square"
                        type="li"
                    >
                        <div className="banner" />
                        <div className="title" />
                        <div className="content">
                            {opts.fact1Content}
                        </div>
                    </skoash.Component>,
                    <skoash.Component
                        ref="fact-2"
                        className="fact-2 frame square"
                        type="li"
                    >
                        <div className="banner" />
                        <div className="title" />
                        <div className="content">
                            {opts.fact2Content}
                        </div>
                    </skoash.Component>,
                    <skoash.Component
                        ref="fact-3"
                        className="fact-3 frame square"
                        type="li"
                    >
                        <div className="banner" />
                        <div className="title" />
                        <div className="content">
                            {opts.fact3Content}
                        </div>
                    </skoash.Component>,
                    <skoash.Component
                        ref="complete"
                        className="complete frame square"
                        type="li"
                    >
                        <div className="content">
                            {opts.completeContent}
                        </div>
                    </skoash.Component>,
                    <skoash.Component
                        ref="replay"
                        className="replay frame square"
                        type="li"
                    >
                        <div className="content">
                            <p>
                                You have not won this level,<br/>
                                but don't worry—<br/>
                                you have another chance!
                            </p>
                        </div>
                    </skoash.Component>,
                ]}
            />
            <skoash.MediaCollection
                play={_.get(props, 'data.reveal.open')}
            >
                <skoash.Audio
                    type="voiceOver"
                    ref="intro"
                    src={`${CMWN.MEDIA.VO}${opts.introVO}.mp3`}
                />
                <skoash.Audio
                    type="voiceOver"
                    ref="complete"
                    src={`${CMWN.MEDIA.VO}Level_${opts.level}.mp3`}
                />
                <skoash.Audio
                    type="voiceOver"
                    ref="fact-1"
                    src={`${CMWN.MEDIA.VO}${opts.fact1VO}.mp3`}
                />
                <skoash.Audio
                    type="voiceOver"
                    ref="fact-2"
                    src={`${CMWN.MEDIA.VO}${opts.fact2VO}.mp3`}
                />
                <skoash.Audio
                    type="voiceOver"
                    ref="fact-3"
                    src={`${CMWN.MEDIA.VO}${opts.fact3VO}.mp3`}
                />
                <skoash.Audio
                    type="voiceOver"
                    ref="replay"
                    src={`${CMWN.MEDIA.VO}Another_Chance.mp3`}
                    complete
                />
            </skoash.MediaCollection>
        </skoash.Screen>
    );
}
