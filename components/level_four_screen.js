import PhaserGameScreenComponent from './phaser_game_screen_component';

export default function (props, ref, key) {
    return PhaserGameScreenComponent(props, ref, key, {
        level: 4,
        introVO: 'And_The_World',
        fact1VO: 'BothSides',
        fact2VO: 'Container',
        fact3VO: 'Electronics',
        introContent: (
            <p>
                By collecting the <span className="truck" /><br/>
                and disposing of waste<br/>
                properly, you can help<br/>
                both your community<br/>
                and the world!
            </p>
        ),
        completeContent: (
            <p>
                You're almost at the finish line!<br/>
                Keep picking up litter and<br/>
                tips on how to Reduce,<br/>
                Reuse, and Recycle!
            </p>
        ),
        fact1Content: (
            <p>
                <span>
                    Use Both Sides of a<br/>
                    Piece of Paper
                </span>
                Tip: Whether doing your homework<br/>
                or making a shopping list,<br/>
                writing on both sides of<br/>
                notepaper is the<br/>
                right thing to do!
            </p>
        ),
        fact2Content: (
            <p>
                <span>
                    Put Your Lunch in<br/>
                    a Reusable Container
                </span>
                Tip: Instead of carrying your<br/>
                lunch in a paper or<br/>
                plastic bag, why not use<br/>
                a reusable container?
            </p>
        ),
        fact3Content: (
            <p>
                <span>
                    Recycle Your Electronics
                </span>
                Tip: Electronic waste contains<br/>
                hazardous materials and<br/>
                toxins and should always be<br/>
                recycled appropriately.
            </p>
        ),
    });
}
